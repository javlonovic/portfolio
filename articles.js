// Articles page functionality

// Enhanced filter functionality with animations
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card-full');
    
    // Initialize articles - they should be visible by default
    articles.forEach((article, index) => {
        article.classList.add('animate-in');
        article.style.animationDelay = `${index * 0.1}s`;
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter articles with smooth transitions
            let visibleIndex = 0;
            articles.forEach((article, index) => {
                if (category === 'all' || article.getAttribute('data-category') === category) {
                    article.style.display = 'block';
                    article.classList.remove('hidden');
                    article.classList.add('animate-in', 'fade-in');
                    article.style.animationDelay = `${visibleIndex * 0.1}s`;
                    visibleIndex++;
                } else {
                    article.style.display = 'none';
                    article.classList.add('hidden');
                    article.classList.remove('animate-in', 'fade-in');
                }
            });
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let articlesLoaded = 6;
    const totalArticles = 12; // Simulate more articles
    
    loadMoreBtn.addEventListener('click', function() {
        // Add loading animation
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        this.classList.add('loading-shimmer');
        
        // Simulate loading delay
        setTimeout(() => {
            const articlesGrid = document.querySelector('.articles-grid-full');
            
            // Create additional articles (simulated)
            for (let i = articlesLoaded; i < Math.min(articlesLoaded + 3, totalArticles); i++) {
                const newArticle = createArticleElement(i + 1);
                newArticle.classList.add('animate-out'); // Start hidden
                articlesGrid.appendChild(newArticle);
                
                // Animate in new articles
                setTimeout(() => {
                    newArticle.classList.remove('animate-out');
                    newArticle.classList.add('animate-in', 'fade-in');
                }, (i - articlesLoaded) * 200);
            }
            
            articlesLoaded += 3;
            
            // Reset button
            this.textContent = originalText;
            this.disabled = false;
            this.classList.remove('loading-shimmer');
            
            if (articlesLoaded >= totalArticles) {
                this.style.display = 'none';
                showNotification('All articles loaded!', 'info');
            }
            
            showNotification(`Loaded ${Math.min(3, totalArticles - (articlesLoaded - 3))} more articles`, 'success');
        }, 1500);
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing! You\'ll receive updates soon.', 'success');
            this.reset();
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1];
            
            // Navigate to index page with hash
            window.location.href = `index.html#${targetId}`;
        });
    });
});

// Function to create new article elements (for load more functionality)
function createArticleElement(id) {
    const article = document.createElement('article');
    article.className = 'article-card-full fade-in';
    article.setAttribute('data-category', getRandomCategory());
    
    const categories = ['JavaScript', 'React', 'Node.js', 'CSS', 'Tutorial'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titles = [
        'Advanced JavaScript Patterns',
        'React Performance Optimization',
        'Node.js Security Best Practices',
        'CSS Animation Techniques',
        'Building Progressive Web Apps',
        'TypeScript for Beginners',
        'GraphQL vs REST APIs'
    ];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    // Map categories to image URLs (matching index.html)
    const categoryImages = {
        'JavaScript': 'https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png',
        'React': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFGBTwrc-m2PX_3YlVq-RcE25W8wv96dBTw&s',
        'Node.js': 'https://static.vecteezy.com/system/resources/previews/060/194/950/non_2x/node-js-framework-3d-icon-transparent-background-free-png.png',
        'CSS': 'https://static.vecteezy.com/system/resources/previews/051/336/376/non_2x/css-programming-transparent-logo-free-png.png',
        'Tutorial': 'https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png' // Default to JavaScript image for tutorials
    };
    
    const imageSrc = categoryImages[category] || 'https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png';
    
    article.innerHTML = `
        <div class="article-image-full">
            <img src="${imageSrc}" alt="${title}">
            <div class="article-overlay">
                <a href="article-detail.html?id=${id}" class="read-article-btn">
                    <i class="fas fa-book-open"></i>
                    Read Full Article
                </a>
            </div>
        </div>
        <div class="article-content-full">
            <div class="article-meta-top">
                <span class="article-category">${category}</span>
                <span class="article-date">November ${Math.floor(Math.random() * 30) + 1}, 2024</span>
            </div>
            <h2>${title}</h2>
            <p>Discover advanced techniques and best practices for modern web development. This comprehensive guide covers everything you need to know.</p>
            <div class="article-tags">
                <span class="tag">Advanced</span>
                <span class="tag">Best Practices</span>
                <span class="tag">Tutorial</span>
            </div>
            <div class="article-footer">
                <div class="article-stats">
                    <span><i class="fas fa-clock"></i> ${Math.floor(Math.random() * 10) + 5} min read</span>
                    <span><i class="fas fa-eye"></i> ${Math.floor(Math.random() * 2000) + 500} views</span>
                    <span><i class="fas fa-heart"></i> ${Math.floor(Math.random() * 200) + 50} likes</span>
                </div>
                <a href="article-detail.html?id=${id}" class="read-more-btn">Read More</a>
            </div>
        </div>
    `;
    
    return article;
}

function getRandomCategory() {
    const categories = ['javascript', 'react', 'nodejs', 'css', 'tutorial'];
    return categories[Math.floor(Math.random() * categories.length)];
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add different animations based on element type
            if (element.classList.contains('newsletter-content')) {
                element.style.animation = 'slideInUp 0.8s ease-out';
            } else if (element.classList.contains('filter-tabs')) {
                element.style.animation = 'slideInLeft 0.6s ease-out';
            }
            
            // Add ripple effect for interactive elements
            if (element.classList.contains('article-card-full')) {
                addRippleEffect(element);
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe various elements (excluding article cards as they're handled separately)
document.querySelectorAll('.newsletter-content, .filter-tabs').forEach(el => {
    observer.observe(el);
});

// Add ripple effect to all article cards immediately
document.querySelectorAll('.article-card-full').forEach(card => {
    addRippleEffect(card);
});

// Add ripple effect function
function addRippleEffect(element) {
    element.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(34, 197, 94, 0.1);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Search functionality (if you want to add a search bar later)
function searchArticles(query) {
    const articles = document.querySelectorAll('.article-card-full');
    const searchTerm = query.toLowerCase();
    
    articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();
        const content = article.querySelector('p').textContent.toLowerCase();
        const category = article.querySelector('.article-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
            article.style.display = 'block';
            article.classList.add('fade-in');
        } else {
            article.style.display = 'none';
            article.classList.remove('fade-in');
        }
    });
}

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-to-top');
    if (!scrollTop) {
        // Create scroll to top button
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: #22c55e;
            color: #000;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        `;
        
        button.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.background = '#16a34a';
            this.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = '#22c55e';
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(button);
    }
    
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollToTop.style.display = 'flex';
    } else {
        scrollToTop.style.display = 'none';
    }
});

console.log('Articles page loaded successfully! 📚');