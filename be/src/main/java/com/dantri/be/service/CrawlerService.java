package com.dantri.be.service;

import com.dantri.be.model.ArticleResponse;
import com.dantri.be.model.ArticleResponse.BodyContent;
import com.dantri.be.model.NewsItem;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CrawlerService {

    public ArticleResponse crawlArticle(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();

        // 1. Tieu de
        String title = "";
        Element titleElem = doc.selectFirst("h1.title-page.detail");
        if (titleElem != null) {
            title = titleElem.text();
        }

        // 2. Sapo
        String sapo = "";
        Element sapoElem = doc.selectFirst("h2.singular-sapo");
        if (sapoElem != null) {
            sapo = sapoElem.text();
        }

        // 3. Noi dung (parse tung doan)
        List<BodyContent> body = new ArrayList<>();
        Element contentContainer = doc.selectFirst(".singular-content");
        
        if (contentContainer != null) {
            // Duyet qua cac the con truc diep
            Elements children = contentContainer.children();
            for (Element child : children) {
                // Xu ly the p (Text)
                if (child.tagName().equals("p")) {
                    String text = child.text().trim();
                    if (!text.isEmpty()) {
                        body.add(new BodyContent("text", text));
                    }
                }
                // Xu ly the figure (Image)
                else if (child.tagName().equals("figure")) {
                     Element img = child.selectFirst("img");
                     if (img != null) {
                         // Thuong anh se o data-src hoac src
                         String src = img.attr("data-src");
                         if (src.isEmpty()) {
                             src = img.attr("src");
                         }
                         if (!src.isEmpty()) {
                             body.add(new BodyContent("image", src));
                         }
                         
                         // Lay caption neu co
                         Element caption = child.selectFirst("figcaption");
                         if (caption != null) {
                             String captionText = caption.text().trim();
                             if(!captionText.isEmpty()){
                                 body.add(new BodyContent("text", captionText)); // coi caption nhu text
                             }
                         }
                     }
                }
            }
        }

        return new ArticleResponse(title, sapo, body);
    }

    public List<NewsItem> getLatestNews(String rssUrl) {
        List<NewsItem> newsList = new ArrayList<>();
        try {
            if (rssUrl == null || rssUrl.isEmpty()) {
                rssUrl = "https://dantri.com.vn/rss/home.rss";
            }
            
            // Parse XML RSS
            Document doc = Jsoup.connect(rssUrl)
                    .parser(org.jsoup.parser.Parser.xmlParser())
                    .get();

            Elements items = doc.select("item");
            for (Element item : items) {
                String title = item.select("title").text();
                String link = item.select("link").text();
                String pubDate = item.select("pubDate").text();
                String descriptionHtml = item.select("description").text();

                // Extract image from description HTMl if possible
                // Description often contains: <a href...><img src='...'/></a></br>(Dân trí)...
                String imageUrl = "";
                String cleanDescription = "";

                if (!descriptionHtml.isEmpty()) {
                    Document descDoc = Jsoup.parseBodyFragment(descriptionHtml);
                    Element img = descDoc.selectFirst("img");
                    if (img != null) {
                        imageUrl = img.attr("src");
                    }
                    cleanDescription = descDoc.text();
                }

                newsList.add(new NewsItem(title, link, cleanDescription, pubDate, imageUrl));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newsList;
    }
}
