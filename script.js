// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const nameModal = document.getElementById('nameModal');
    const nameInput = document.getElementById('nameInput');
    const createCardBtn = document.getElementById('createCard');
    const cardContainer = document.getElementById('cardContainer');
    const userNameDisplay = document.getElementById('userName');
    const changeNameBtn = document.getElementById('changeNameBtn');
    const nameClickArea = document.getElementById('nameClickArea');
    const musicIndicator = document.getElementById('musicIndicator');
    const musicControl = document.getElementById('musicControl');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');

    let isPlaying = false;
    let musicReady = false;

    // Focus on input when page loads
    nameInput.focus();

    // Handle Enter key press in input
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createCard();
        }
    });

    // Handle create card button click
    createCardBtn.addEventListener('click', createCard);

    // Handle change name button click
    changeNameBtn.addEventListener('click', function() {
        showNameModal();
        nameInput.value = userNameDisplay.textContent;
        nameInput.select();
    });

    // Music functionality
    nameClickArea.addEventListener('click', function() {
        if (!musicReady) {
            // Try to play music (user interaction required for autoplay policy)
            backgroundMusic.play().then(() => {
                musicReady = true;
                isPlaying = true;
                updateMusicUI();
                nameClickArea.classList.add('playing');
                musicIndicator.classList.add('show');
                musicControl.classList.remove('hidden');
            }).catch(error => {
                console.log('Music play failed:', error);
                // Show message to user about music
                showMusicMessage();
            });
        } else {
            toggleMusic();
        }
    });

    // Music control button
    musicToggle.addEventListener('click', function() {
        toggleMusic();
    });

    // Music event listeners
    backgroundMusic.addEventListener('loadeddata', function() {
        nameClickArea.classList.add('pulse');
    });

    backgroundMusic.addEventListener('ended', function() {
        isPlaying = false;
        updateMusicUI();
        nameClickArea.classList.remove('playing');
    });

    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
            nameClickArea.classList.remove('playing');
            musicIndicator.classList.remove('show');
        } else {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                nameClickArea.classList.add('playing');
                musicIndicator.classList.add('show');
            }).catch(error => {
                console.log('Music play failed:', error);
            });
        }
        updateMusicUI();
    }

    function updateMusicUI() {
        musicIcon.textContent = isPlaying ? '🔊' : '🔇';
        const musicText = document.querySelector('.music-text');
        musicText.textContent = isPlaying ? 'Music Playing' : 'Click to play music';
    }

    function showMusicMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b9d, #c44569);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
            z-index: 2000;
            text-align: center;
            font-size: 1.1rem;
            animation: messageSlideIn 0.5s ease-out;
        `;
        message.innerHTML = `
            <div>🎵 Click again to play birthday music! 🎵</div>
            <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.9;">
                (Your browser may require user interaction to play audio)
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'messageSlideOut 0.5s ease-in forwards';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    // Main function to create and show card
    function createCard() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            // Add shake animation to input if empty
            nameInput.classList.add('shake');
            nameInput.style.borderColor = '#e74c3c';
            nameInput.placeholder = 'Please enter your name!';
            
            setTimeout(() => {
                nameInput.classList.remove('shake');
                nameInput.style.borderColor = '#ff6b9d';
                nameInput.placeholder = 'Type your lovely name....';
            }, 1000);
            
            return;
        }

        // Validate name length
        if (name.length > 20) {
            alert('Please enter a shorter name (max 20 characters)');
            return;
        }

        // Display the name on the card
        userNameDisplay.textContent = name;
        
        // Hide modal with animation
        hideNameModal();
        
        // Show card and enable music functionality
        showCard();
        
        // Show music control after a delay
        setTimeout(() => {
            musicControl.classList.remove('hidden');
        }, 2000);
        
        // Start continuous animations
        startFloatingHearts();
        addSparkleEffects();
    }

    // Function to hide name modal
    function hideNameModal() {
        nameModal.style.animation = 'modalSlideOut 0.5s ease-in forwards';
        
        setTimeout(() => {
            nameModal.style.display = 'none';
        }, 500);
    }

    // Function to show name modal
    function showNameModal() {
        nameModal.style.display = 'flex';
        nameModal.style.animation = 'modalSlideIn 0.6s ease-out forwards';
        nameInput.focus();
    }

    // Function to show card
    function showCard() {
        cardContainer.classList.remove('hidden');
        cardContainer.style.animation = 'cardFadeIn 1s ease-out forwards';
    }

    // Function to start floating hearts animation
    function startFloatingHearts() {
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach((heart, index) => {
            // Restart animation by removing and adding back
            heart.style.animation = 'none';
            setTimeout(() => {
                heart.style.animation = `floatUp ${6 + index}s ease-in-out infinite`;
                heart.style.animationDelay = `${index * 1.5}s`;
            }, 100);
        });
    }

    // Function to add sparkle effects around the name
    function addSparkleEffects() {
        const nameDisplay = document.querySelector('.name-display');
        
        setInterval(() => {
            createSparkle(nameDisplay);
        }, 1500);
    }

    // Function to create individual sparkle
    function createSparkle(container) {
        const sparkle = document.createElement('div');
        const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💖', '💕'];
        
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkleLife 2s ease-out forwards';
        sparkle.style.zIndex = '10';
        
        container.style.position = 'relative';
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideOut {
            to {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
        }
        
        @keyframes sparkleLife {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg) translateY(-30px);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }

        @keyframes messageSlideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @keyframes messageSlideOut {
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }

        .hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Add random color changes to decorative elements
    function animateDecorations() {
        const decorations = document.querySelectorAll('.decorative-elements > div');
        
        setInterval(() => {
            decorations.forEach(decoration => {
                const hue = Math.random() * 360;
                decoration.style.filter = `hue-rotate(${hue}deg) brightness(1.2)`;
                
                setTimeout(() => {
                    decoration.style.filter = 'none';
                }, 1000);
            });
        }, 3000);
    }

    // Start decoration animations after card is shown
    setTimeout(animateDecorations, 2000);

    // Add dynamic background gradient changes
    function animateBackground() {
        const colors = [
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 75%, #ff9a9e 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'linear-gradient(135deg, #ff8a80 0%, #ffcdd2 100%)',
            'linear-gradient(135deg, #e1bee7 0%, #f3e5f5 100%)'
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % colors.length;
            document.body.style.background = colors[currentIndex];
        }, 10000);
    }

    // Start background animation
    setTimeout(animateBackground, 5000);

    // Add click effects to the card
    const greetingCard = document.querySelector('.greeting-card');
    
    greetingCard.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'radial-gradient(circle, rgba(255,107,157,0.6) 0%, transparent 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.8s ease-out forwards';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '20';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Additional utility functions
function getRandomColor() {
    const colors = ['#ff6b9d', '#c44569', '#ff9a9e', '#fecfef', '#a8edea', '#fed6e3'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createHeartParticle() {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.animation = 'heartFloat 4s linear forwards';
    heart.style.zIndex = '1';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Add heart particle animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        to {
            top: -50px;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Create heart particles periodically
setInterval(createHeartParticle, 2000);