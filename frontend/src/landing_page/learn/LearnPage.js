import React from "react";
import { Link } from "react-router-dom";
import "../Common.css";
import "./LearnPage.css";

function LearnPage() {
  // Mock data for blog posts with updated, reliable image links
  const articles = [
    {
      title: "A Beginner's Guide to Stock Market Investing",
      category: "Stocks",
      excerpt:
        "Learn the fundamentals of stock market investing, from choosing a broker to picking your first stock.",
      image: "https://placehold.co/400x250/e6f8f0/2d3436?text=Investing+101",
    },
    {
      title: "Understanding Mutual Funds and SIPs",
      category: "Mutual Funds",
      excerpt:
        "Dive deep into how mutual funds work and why Systematic Investment Plans (SIPs) are a great tool for wealth creation.",
      image: "https://placehold.co/400x250/e6f8f0/2d3436?text=Mutual+Funds",
    },
    {
      title: "How to Diversify Your Portfolio",
      category: "Strategy",
      excerpt:
        "Don't put all your eggs in one basket. Learn effective strategies to diversify your investments and manage risk.",
      image: "https://placehold.co/400x250/e6f8f0/2d3436?text=Portfolio",
    },
    {
      title: "An Introduction to Futures & Options",
      category: "Advanced",
      excerpt:
        "Take your trading to the next level by understanding the basics of derivatives, including futures and options.",
      image: "https://placehold.co/400x250/e6f8f0/2d3436?text=F%26O",
    },
    {
      title: "Tax Planning for Investors in India",
      category: "Finance",
      excerpt:
        "Understand how your investment gains are taxed and learn strategies to save on taxes legally.",
      image: "https://placehold.co/400x250/e6f8f0/2d3436?text=Taxation",
    },
    {
      title: "Investing in US Stocks from India",
      category: "Global Markets",
      excerpt:
        "A step-by-step guide on how to start investing in international markets and buying shares of global companies.",
      image: "https://placehold.co/400x250/e6f8f0/2d3436?text=US+Stocks",
    },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>Learning Center</h1>
        <p>Your guide to the world of investing. All free.</p>
      </div>
      <div className="article-grid-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="card-content">
              <span className="category-tag">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link to="#" className="btn">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearnPage;
