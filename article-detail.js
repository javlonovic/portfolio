// Article Detail Page Functionality

// Article data
const articles = {
    1: {
        title: "10 JavaScript Tips Every Developer Should Know",
        category: "JavaScript",
        date: "December 15, 2024",
        readTime: "5",
        views: "1.2K",
        likes: "89",
        image: "https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png",
        tags: ["ES6+", "Performance", "Best Practices", "JavaScript", "Tips"],
        content: `
            <p>JavaScript continues to evolve, and staying up-to-date with the latest features and best practices is crucial for every developer. In this comprehensive guide, we'll explore 10 essential JavaScript tips that will make your code more efficient, readable, and maintainable.</p>

            <h2>1. Use Destructuring Assignment</h2>
            <p>Destructuring assignment allows you to extract values from arrays or properties from objects into distinct variables. This feature makes your code cleaner and more readable.</p>
            
            <pre><code class="language-javascript">// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Object destructuring
const { name, age, ...otherProps } = person;
console.log(name); // person.name
console.log(age);  // person.age</code></pre>

            <h2>2. Master Template Literals</h2>
            <p>Template literals provide a more powerful way to work with strings, allowing for multi-line strings and embedded expressions.</p>
            
            <pre><code class="language-javascript">const name = 'John';
const age = 30;

// Instead of concatenation
const message = \`Hello, my name is \${name} and I'm \${age} years old.\`;

// Multi-line strings
const html = \`
    &lt;div class="user-card"&gt;
        &lt;h2&gt;\${name}&lt;/h2&gt;
        &lt;p&gt;Age: \${age}&lt;/p&gt;
    &lt;/div&gt;
\`;</code></pre>

            <h2>3. Use Arrow Functions Wisely</h2>
            <p>Arrow functions provide a concise syntax and lexical <code>this</code> binding, but they're not always the right choice.</p>
            
            <blockquote>
                Remember: Arrow functions don't have their own <code>this</code> context, which can be both a feature and a limitation depending on your use case.
            </blockquote>

            <pre><code class="language-javascript">// Good for simple operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Good for callbacks
setTimeout(() => {
    console.log('Timer finished');
}, 1000);

// Avoid for object methods if you need 'this'
const obj = {
    name: 'John',
    greet: () => {
        console.log(\`Hello, \${this.name}\`); // 'this' is not obj
    }
};</code></pre>

            <h2>4. Leverage Array Methods</h2>
            <p>Modern JavaScript provides powerful array methods that can replace traditional loops and make your code more functional and readable.</p>

            <pre><code class="language-javascript">const users = [
    { name: 'John', age: 30, active: true },
    { name: 'Jane', age: 25, active: false },
    { name: 'Bob', age: 35, active: true }
];

// Filter active users
const activeUsers = users.filter(user => user.active);

// Get user names
const names = users.map(user => user.name);

// Find specific user
const john = users.find(user => user.name === 'John');

// Check if any user is over 30
const hasOlderUsers = users.some(user => user.age > 30);</code></pre>

            <h2>5. Handle Promises with Async/Await</h2>
            <p>Async/await makes asynchronous code more readable and easier to debug compared to traditional promise chains.</p>

            <pre><code class="language-javascript">// Instead of promise chains
function fetchUserData(id) {
    return fetch(\`/api/users/\${id}\`)
        .then(response => response.json())
        .then(user => {
            return fetch(\`/api/posts/\${user.id}\`);
        })
        .then(response => response.json());
}

// Use async/await
async function fetchUserData(id) {
    try {
        const userResponse = await fetch(\`/api/users/\${id}\`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(\`/api/posts/\${user.id}\`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}</code></pre>

            <h2>6. Use Optional Chaining</h2>
            <p>Optional chaining allows you to safely access nested object properties without worrying about null or undefined values.</p>

            <pre><code class="language-javascript">const user = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};

// Safe property access
const street = user?.address?.street;
const zipCode = user?.address?.zipCode; // undefined, no error

// Safe method calls
const result = user?.someMethod?.();

// Safe array access
const firstPost = user?.posts?.[0];</code></pre>

            <h2>7. Implement Proper Error Handling</h2>
            <p>Robust error handling is crucial for building reliable applications. Always anticipate and handle potential errors gracefully.</p>

            <pre><code class="language-javascript">// Custom error classes
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Comprehensive error handling
async function processUserData(userData) {
    try {
        if (!userData.email) {
            throw new ValidationError('Email is required');
        }
        
        const result = await saveUser(userData);
        return result;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Validation failed:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}</code></pre>

            <h2>8. Use Modern Module Syntax</h2>
            <p>ES6 modules provide a clean way to organize and share code between files.</p>

            <pre><code class="language-javascript">// utils.js
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date);
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// main.js
import { formatDate, debounce } from './utils.js';

const handleSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);</code></pre>

            <h2>9. Optimize Performance with Memoization</h2>
            <p>Memoization can significantly improve performance for expensive function calls by caching results.</p>

            <pre><code class="language-javascript">// Simple memoization
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const expensiveFunction = memoize((n) => {
    console.log('Computing...');
    return n * n * n;
});

console.log(expensiveFunction(5)); // Computing... 125
console.log(expensiveFunction(5)); // 125 (cached)</code></pre>

            <h2>10. Write Clean, Readable Code</h2>
            <p>Clean code is not just about functionality—it's about maintainability and collaboration.</p>

            <ul>
                <li>Use meaningful variable and function names</li>
                <li>Keep functions small and focused</li>
                <li>Add comments for complex logic</li>
                <li>Use consistent formatting and style</li>
                <li>Avoid deep nesting</li>
            </ul>

            <pre><code class="language-javascript">// Bad
function calc(x, y, z) {
    if (x > 0) {
        if (y > 0) {
            if (z > 0) {
                return x * y * z;
            }
        }
    }
    return 0;
}

// Good
function calculateVolume(length, width, height) {
    const isValidDimension = (dimension) => dimension > 0;
    
    if (!isValidDimension(length) || !isValidDimension(width) || !isValidDimension(height)) {
        return 0;
    }
    
    return length * width * height;
}</code></pre>

            <h2>Conclusion</h2>
            <p>These JavaScript tips will help you write more efficient, maintainable, and modern code. Remember that the key to mastering JavaScript is consistent practice and staying updated with the latest features and best practices.</p>

            <p>Keep experimenting with these techniques in your projects, and don't hesitate to dive deeper into the JavaScript documentation to understand the nuances of each feature.</p>
        `
    },
    2: {
        title: "Mastering React Hooks: A Complete Guide",
        category: "React",
        date: "December 12, 2024",
        readTime: "8",
        views: "2.1K",
        likes: "156",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFGBTwrc-m2PX_3YlVq-RcE25W8wv96dBTw&s",
        tags: ["React", "Hooks", "Components", "State Management", "Effects"],
        content: `
            <p>React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. This comprehensive guide will take you through everything you need to know about React Hooks.</p>

            <h2>Understanding useState</h2>
            <p>The useState hook is the most fundamental hook for managing state in functional components.</p>
            
            <pre><code class="language-jsx">import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        &lt;div&gt;
            &lt;p&gt;Count: {count}&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;
                Increment
            &lt;/button&gt;
        &lt;/div&gt;
    );
}</code></pre>

            <h2>Mastering useEffect</h2>
            <p>useEffect handles side effects in functional components, replacing lifecycle methods from class components.</p>
            
            <pre><code class="language-jsx">import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            try {
                const response = await fetch(\`/api/users/\${userId}\`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUser();
    }, [userId]); // Dependency array
    
    if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
    if (!user) return &lt;div&gt;User not found&lt;/div&gt;;
    
    return &lt;div&gt;{user.name}&lt;/div&gt;;
}</code></pre>

            <h2>Creating Custom Hooks</h2>
            <p>Custom hooks allow you to extract component logic into reusable functions.</p>
            
            <pre><code class="language-jsx">// Custom hook for API calls
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function UserList() {
    const { data: users, loading, error } = useApi('/api/users');
    
    if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
    if (error) return &lt;div&gt;Error: {error.message}&lt;/div&gt;;
    
    return (
        &lt;ul&gt;
            {users.map(user => (
                &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
            ))}
        &lt;/ul&gt;
    );
}</code></pre>

            <p>This guide covers the essential React Hooks patterns that every React developer should master. Practice these concepts in your projects to become proficient with modern React development.</p>
        `
    },
    3: {
        title: "Building Scalable APIs with Node.js",
        category: "Node.js",
        date: "December 8, 2024",
        readTime: "12",
        views: "1.8K",
        likes: "134",
        image: "https://static.vecteezy.com/system/resources/previews/060/194/950/non_2x/node-js-framework-3d-icon-transparent-background-free-png.png",
        tags: ["Node.js", "Express", "API Design", "Scalability", "Backend"],
        content: `
            <p>Building scalable APIs is crucial for modern web applications. This comprehensive guide covers best practices for creating robust and scalable REST APIs using Node.js and Express.</p>

            <h2>Setting Up Express with Best Practices</h2>
            <p>Start with a solid foundation by properly structuring your Express application.</p>
            
            <pre><code class="language-javascript">const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

module.exports = app;</code></pre>

            <h2>Implementing Proper Error Handling</h2>
            <p>Robust error handling is essential for API reliability and debugging.</p>
            
            <pre><code class="language-javascript">// Custom error class
class APIError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new APIError(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new APIError(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;</code></pre>

            <p>This article provides a comprehensive foundation for building scalable Node.js APIs with proper architecture, security, and performance considerations.</p>
        `
    },
    4: {
        title: "Modern CSS Grid Layouts Made Simple",
        category: "CSS",
        date: "December 5, 2024",
        readTime: "6",
        views: "950",
        likes: "67",
        image: "https://static.vecteezy.com/system/resources/previews/051/336/376/non_2x/css-programming-transparent-logo-free-png.png",
        tags: ["CSS Grid", "Layout", "Responsive", "Web Design", "Frontend"],
        content: `
            <p>CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. This guide will help you master CSS Grid from basics to advanced techniques.</p>

            <h2>Grid Basics</h2>
            <p>Understanding the fundamental concepts of CSS Grid.</p>
            
            <pre><code class="language-css">.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
}</code></pre>

            <h2>Advanced Grid Techniques</h2>
            <p>Learn how to create complex layouts with grid areas and advanced positioning.</p>
            
            <pre><code class="language-css">.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }</code></pre>

            <p>CSS Grid provides incredible flexibility for creating modern, responsive layouts. Practice these techniques to master grid-based design.</p>
        `
    }
};

// Get article ID from URL parameters
function getArticleId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

// Load article content
function loadArticle() {
    const articleId = getArticleId();
    const article = articles[articleId];
    
    if (!article) {
        // Redirect to articles page if article not found
        window.location.href = 'articles.html';
        return;
    }
    
    // Update page title
    document.title = `${article.title} - John Developer`;
    
    // Update header content
    document.getElementById('breadcrumb-title').textContent = article.title;
    document.getElementById('header-category').textContent = article.category;
    document.getElementById('header-title').textContent = article.title;
    document.getElementById('header-date').textContent = article.date;
    document.getElementById('header-read-time').textContent = article.readTime;
    document.getElementById('header-views').textContent = article.views;
    document.getElementById('header-likes').textContent = article.likes;
    
    // Update featured image
    document.getElementById('featured-image').src = article.image;
    document.getElementById('featured-image').alt = article.title;
    
    // Update article content
    document.getElementById('article-content').innerHTML = article.content;
    
    // Update tags
    const tagsContainer = document.getElementById('article-tags');
    tagsContainer.innerHTML = article.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    // Generate table of contents
    generateTableOfContents();
    
    // Load related articles
    loadRelatedArticles(articleId);
    
    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Generate table of contents
function generateTableOfContents() {
    const headings = document.querySelectorAll('#article-content h2, #article-content h3');
    const tocList = document.getElementById('toc-list');
    
    if (headings.length === 0) {
        document.querySelector('.table-of-contents').style.display = 'none';
        return;
    }
    
    tocList.innerHTML = '';
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.className = heading.tagName.toLowerCase() === 'h3' ? 'sub-heading' : '';
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    // Add smooth scrolling and active state
    const tocLinks = tocList.querySelectorAll('a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Update active TOC link on scroll
    window.addEventListener('scroll', updateActiveTocLink);
}

// Update active table of contents link
function updateActiveTocLink() {
    const headings = document.querySelectorAll('#article-content h2, #article-content h3');
    const tocLinks = document.querySelectorAll('#toc-list a');
    
    let activeHeading = null;
    
    headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
            activeHeading = heading;
        }
    });
    
    tocLinks.forEach(link => link.classList.remove('active'));
    
    if (activeHeading) {
        const activeLink = document.querySelector(`#toc-list a[href="#${activeHeading.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Load related articles
function loadRelatedArticles(currentId) {
    const relatedContainer = document.getElementById('related-articles');
    const currentArticle = articles[currentId];
    
    // Get other articles (excluding current)
    const otherArticles = Object.entries(articles)
        .filter(([id]) => id !== currentId)
        .slice(0, 3); // Show max 3 related articles
    
    relatedContainer.innerHTML = otherArticles.map(([id, article]) => `
        <div class="related-article-card">
            <img src="${article.image}" alt="${article.title}">
            <div class="content">
                <span class="category">${article.category}</span>
                <h3><a href="article-detail.html?id=${id}">${article.title}</a></h3>
                <p>${article.content.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for related articles
    relatedContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = this.href;
        });
    });
}

// Article actions
function initializeArticleActions() {
    // Like button
    const likeBtn = document.getElementById('like-btn');
    likeBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (this.classList.contains('active')) {
            icon.className = 'fas fa-heart';
            text.textContent = 'Liked';
            showNotification('Article liked!', 'success');
        } else {
            icon.className = 'far fa-heart';
            text.textContent = 'Like';
        }
    });
    
    // Share button
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('header-title').textContent,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!', 'success');
        }
    });
    
    // Bookmark button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    bookmarkBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (this.classList.contains('active')) {
            icon.className = 'fas fa-bookmark';
            text.textContent = 'Saved';
            showNotification('Article bookmarked!', 'success');
        } else {
            icon.className = 'far fa-bookmark';
            text.textContent = 'Save';
        }
    });
}

// Social sharing
function initializeSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.getElementById('header-title').textContent);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(window.location.href);
                    showNotification('Link copied to clipboard!', 'success');
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Comment form handling
function initializeCommentForm() {
    const commentForm = document.getElementById('comment-form');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('comment-name').value;
        const email = document.getElementById('comment-email').value;
        const message = document.getElementById('comment-message').value;
        
        if (name && email && message) {
            showNotification('Comment submitted successfully!', 'success');
            this.reset();
        }
    });
}

// Initialize page with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    loadArticle();
    initializeArticleActions();
    initializeSocialSharing();
    initializeCommentForm();
    initializeScrollAnimations();
    
    // Add scroll progress indicator
    addScrollProgressIndicator();
    
    // Add typing animation for article content
    addTypingAnimation();
    
    // Add reading progress animations
    addReadingProgressAnimations();
});

// Scroll progress indicator
function addScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #22c55e, #16a34a);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('article-content')) {
                    animateArticleContent(element);
                } else if (element.classList.contains('related-article-card')) {
                    element.style.animation = 'bounceIn 0.6s ease-out';
                } else if (element.classList.contains('comment')) {
                    element.style.animation = 'slideInLeft 0.6s ease-out';
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.article-content, .related-article-card, .comment').forEach(el => {
        observer.observe(el);
    });
}

// Animate article content paragraphs
function animateArticleContent(contentElement) {
    const paragraphs = contentElement.querySelectorAll('p, h2, h3, pre, blockquote');
    
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add typing animation for title
function addTypingAnimation() {
    const title = document.getElementById('header-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #22c55e';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Add reading progress animations
function addReadingProgressAnimations() {
    const tocLinks = document.querySelectorAll('#toc-list a');
    
    tocLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        link.style.transition = 'all 0.4s ease-out';
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, (index * 100) + 2000);
    });
    
    // Animate action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
        btn.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, (index * 200) + 2500);
    });
}

// Add floating animation to scroll progress
function addScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #22c55e, #16a34a);
        z-index: 1000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(34, 197, 94, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    // Add reading time indicator
    const readingIndicator = document.createElement('div');
    readingIndicator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(26, 26, 26, 0.9);
        color: #22c55e;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(34, 197, 94, 0.3);
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    readingIndicator.textContent = '0% read';
    document.body.appendChild(readingIndicator);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        progressBar.style.width = scrollPercent + '%';
        readingIndicator.textContent = `${scrollPercent}% read`;
        
        // Show/hide reading indicator
        if (scrollTop > 200) {
            readingIndicator.style.opacity = '1';
            readingIndicator.style.transform = 'translateY(0)';
        } else {
            readingIndicator.style.opacity = '0';
            readingIndicator.style.transform = 'translateY(-10px)';
        }
    });
}

console.log('Article detail page loaded successfully! 📖');