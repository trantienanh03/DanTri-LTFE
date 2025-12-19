package com.dantri.be.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {
    private String title;
    private String sapo;
    private List<BodyContent> body;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BodyContent {
        private String type; // "text" or "image"
        private String content; // text content or image url
    }
}
