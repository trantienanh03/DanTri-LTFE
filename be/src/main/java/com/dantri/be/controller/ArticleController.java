package com.dantri.be.controller;

import com.dantri.be.model.ArticleResponse;
import com.dantri.be.service.CrawlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Cho phep React goi thoai mai
public class ArticleController {

    private final CrawlerService crawlerService;

    @GetMapping("/article")
    public ResponseEntity<?> getArticle(@RequestParam String url) {
        try {
            ArticleResponse response = crawlerService.crawlArticle(url);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cào dữ liệu: " + e.getMessage());
        }
    }

    @GetMapping("/news")
    public ResponseEntity<?> getLatestNews(@RequestParam(required = false) String url) {
        return ResponseEntity.ok(crawlerService.getLatestNews(url));
    }
}
