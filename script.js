function createHearts(count, type = 'rose') {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    
    const colors = type === 'rose' 
        ? ['#999', '#777'] 
        : ['#ff4757', '#ff6b81', '#ff9ff3'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const startX = Math.random() * 100;
            const duration = Math.random() * 4 + 2;
            const size = Math.random() * 15 + 10;
            const delay = Math.random() * 2;
            
            heart.style.left = `${startX}vw`;
            heart.style.top = `100vh`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.animation = `floatUp ${duration}s ease-in ${delay}s forwards`;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.background = color;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode === container) heart.remove();
            }, (duration + delay) * 1000);
        }, i * 50);
    }
}

function initializeHearts() {
    createHearts(10, 'love');
    setInterval(() => createHearts(3, 'love'), 3000);
}

function checkDate() {
    const dateInput = document.getElementById('dateInput');
    const errorMessage = document.getElementById('errorMessage');
    const successPopup = document.getElementById('successPopup');
    
    const selectedDate = new Date(dateInput.value);
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    
    if (month === 10 && day === 27) {
        errorMessage.classList.add('hidden');
        showSuccessPopup();
        createHeartExplosion(50);
    } else {
        showError();
    }
}

function showError() {
    const dateInput = document.getElementById('dateInput');
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.classList.remove('hidden');
    errorMessage.style.animation = 'none';
    setTimeout(() => errorMessage.style.animation = 'fadeIn 0.5s', 10);
    
    dateInput.classList.add('animate-shake');
    setTimeout(() => dateInput.classList.remove('animate-shake'), 500);
    
    setTimeout(() => dateInput.value = '', 300);
    createHearts(5, 'sad');
}

function showSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    const progressBar = document.getElementById('progressBar');
    const countdownElement = document.getElementById('countdown');
    
    successPopup.classList.remove('hidden');
    
    let countdown = 4;
    let currentTime = 0;
    const totalTime = 4000; // 4 seconds in milliseconds
    const interval = 50; // Update every 50ms for smoothness
    
    // Reset the progress bar animation
    progressBar.style.animation = 'none';
    progressBar.style.width = '0%';
    
    // Force reflow to restart animation
    void progressBar.offsetWidth;
    
    // Start the smooth animation
    progressBar.style.animation = 'progress 4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    
    const updateTimer = setInterval(() => {
        currentTime += interval;
        const progress = currentTime / totalTime;
        
        // Smooth countdown with easing
        const remainingTime = Math.max(0, totalTime - currentTime);
        countdown = Math.ceil(remainingTime / 1000);
        
        countdownElement.textContent = countdown;
        
        // Create hearts at specific intervals for smoother experience
        if (currentTime % 500 === 0) { // Every half second
            createHearts(1, 'love');
        }
        
        // When time is up
        if (currentTime >= totalTime) {
            clearInterval(updateTimer);
            countdownElement.textContent = '0';
            
            // Final heart burst
            setTimeout(() => {
                createHeartExplosion(8);
                
                // Smooth redirect
                setTimeout(() => {
                    window.location.href = 'gallery.html';
                }, 800);
            }, 300);
        }
    }, interval);
}

function createHeartExplosion(count) {
    const container = document.getElementById('heartsContainer');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const startX = 50 + (Math.random() - 0.5) * 40;
            const startY = 50 + (Math.random() - 0.5) * 40;
            const duration = Math.random() * 2 + 1;
            const size = Math.random() * 20 + 15;
            
            heart.style.left = `${startX}vw`;
            heart.style.top = `${startY}vh`;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.animation = `floatUp ${duration}s ease-out forwards`;
            
            const colors = ['#ff4757', '#ff6b81', '#ff9ff3'];
            heart.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), duration * 1000);
        }, i * 20);
    }
}

function goToRosePage() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createHearts(1, 'love'), i * 30);
    }
    setTimeout(() => window.location.href = 'rose.html', 1000);
}


 class HeartAnimation {
            constructor() {
                this.container = document.getElementById('heartContainer');
                this.hearts = [];
                this.maxHearts = 50;
                this.nextId = 0;
                this.lastClickTime = 0;
                this.clickCooldown = 300;
            }
            
            createHeart() {
                if (this.hearts.length >= this.maxHearts && this.hearts.length > 0) {
                    const oldHeart = this.hearts.shift();
                    if (oldHeart.element && oldHeart.element.parentNode) {
                        oldHeart.element.remove();
                    }
                }
                
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                const left = Math.random() * 90 + 5; 
                const size = Math.random() * 20 + 50; 
                const duration = 2 + Math.random(); 
                const color = this.getRandomColor();
                
                heart.style.left = `${left}%`;
                heart.style.fontSize = `${size}px`;
                heart.style.color = color;
                heart.style.textShadow = `0 0 15px ${color}80`;
                heart.style.animation = `heartFloat ${duration}s linear forwards`;
                
                this.container.appendChild(heart);
                
                const heartId = this.nextId++;
                this.hearts.push({
                    id: heartId,
                    element: heart,
                    created: Date.now()
                });
            
                setTimeout(() => {
                    this.removeHeart(heartId);
                }, duration * 1000);
                
                return heartId;
            }
            
            createHeartStorm(count = 15) {
                const now = Date.now();
                if (now - this.lastClickTime < this.clickCooldown) {
                    return;
                }
                
                this.lastClickTime = now;
             
                for (let i = 0; i < count; i++) {
                    setTimeout(() => {
                        this.createHeart();
                    }, i * 50); 
                    
                }
                const button = document.getElementById('loveButton');
                if (button) {
                    const originalText = button.textContent;
                    button.textContent = 'Mwaa! Mwaa!😚';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 800);
                }
            }
            
            removeHeart(id) {
                const index = this.hearts.findIndex(h => h.id === id);
                if (index !== -1) {
                    const heart = this.hearts[index];
                    if (heart.element && heart.element.parentNode) {
                        heart.element.style.opacity = '0';
                        heart.element.style.transition = 'opacity 0.3s';
                        
                        setTimeout(() => {
                            if (heart.element.parentNode) {
                                heart.element.remove();
                            }
                        }, 300);
                    }
                    this.hearts.splice(index, 1);
                }
            }
            
            getRandomColor() {
                const colors = [
                    '#ff6b9d', 
                    '#ff4081', 
                    '#e91e63', 
                    '#c2185b', 
                    '#ff80ab',
                    '#f50057', 
                    '#ff1493'  
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            clearAll() {
                this.hearts.forEach(heart => {
                    if (heart.element && heart.element.parentNode) {
                        heart.element.remove();
                    }
                });
                this.hearts = [];
                this.nextId = 0;
            }
        }
        
        const heartAnimator = new HeartAnimation();
        
        function createHeartStorm() {
            heartAnimator.createHeartStorm(12); 
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Heart animation system loaded');
            
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        heartAnimator.createHeart();
                    }, i * 200);
                }
            }, 1000);
            
            let lastInteraction = Date.now();
            let autoPlayInterval;
            
            function startAutoPlay() {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
                
                autoPlayInterval = setInterval(() => {
                    if (Date.now() - lastInteraction > 10000) { 
                        heartAnimator.createHeartStorm(8);
                    }
                }, 15000); 
            }
            
            ['mousemove', 'click', 'touchstart', 'keydown'].forEach(event => {
                document.addEventListener(event, () => {
                    lastInteraction = Date.now();
                });
            });
            
            setTimeout(startAutoPlay, 3000);
            window.addEventListener('beforeunload', function() {
                heartAnimator.clearAll();
                if (autoPlayInterval) {
                    clearInterval(autoPlayInterval);
                }
            });
        });
        
        function goToGallery() {
            window.location.href = 'gallery.html';
        }
   