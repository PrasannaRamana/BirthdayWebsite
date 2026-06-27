/**
 * =============================================================================
 * PREMIUM BIRTHDAY SURPRISE WEBSITE - NAVIGATION CONTROLLER
 * Author: Senior Full Stack Developer & Frontend Architect
 * Description: Implements a modular, highly polished page-transition and 
 *              navigation system. Supports auto-dot generation, scrolling 
 *              throttling, key listeners, touch swipes, and state persistence.
 * =============================================================================
 */

class NavigationController {
    /**
     * Initializes the premium navigation system.
     * @param {Object} config - Configuration settings for the controller.
     */
    constructor(config = {}) {
        this.config = {
            sectionSelector: '.app-section',
            activeClass: 'active-section',
            dotsContainerId: 'nav-dots',
            prevBtnId: 'nav-prev-btn',
            nextBtnId: 'nav-next-btn',
            scrollThrottleDuration: 1000, // Time in ms before another scroll triggers transition (crucial for luxury feel)
            useLocalStorage: true,
            storageKey: 'birthday_surprise_current_step',
            ...config
        };

        // DOM elements
        this.sections = Array.from(document.querySelectorAll(this.config.sectionSelector));
        this.dotsContainer = document.getElementById(this.config.dotsContainerId);
        this.prevBtn = document.getElementById(this.config.prevBtnId);
        this.nextBtn = document.getElementById(this.config.nextBtnId);

        // State management
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.lastScrollTime = 0;
        this.changeCallbacks = [];

        // Check for sections before continuing initialization
        if (this.sections.length === 0) {
            console.warn("NavigationController: No sections found matching selector '" + this.config.sectionSelector + "'. Waiting for dynamic injection or manual additions.");
            return;
        }

        this.init();
    }

    /**
     * Core initializer called on class creation
     */
    init() {
        this.loadSavedState();
        this.buildDotNavigation();
        this.registerEventListeners();
        this.updateSectionStates(null); // Initial state set with no direction
        this.updateUIPeripherals();
    }

    /**
     * Reconstitutes previous navigation state from Local Storage or Hash parameters
     */
    loadSavedState() {
        // Option 1: URL Hash Routing (Takes precedence for bookmarking)
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.replace('#', '');
            const matchedIndex = this.sections.findIndex(sec => sec.id === sectionId);
            if (matchedIndex !== -1) {
                this.currentIndex = matchedIndex;
                return;
            }
        }

        // Option 2: Local Storage Persistence (for resuming the user experience)
        if (this.config.useLocalStorage) {
            const savedStep = localStorage.getItem(this.config.storageKey);
            if (savedStep !== null) {
                const parsedIndex = parseInt(savedStep, 10);
                if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < this.sections.length) {
                    this.currentIndex = parsedIndex;
                }
            }
        }
    }

    /**
     * Dynamically renders dot indicators depending on how many sections are declared
     */
    buildDotNavigation() {
        if (!this.dotsContainer) return;

        // Clear pre-existing dots
        this.dotsContainer.innerHTML = '';

        this.sections.forEach((section, index) => {
            const li = document.createElement('li');
            li.classList.add('nav-dot-item');
            if (index === this.currentIndex) {
                li.classList.add('active');
            }

            const button = document.createElement('button');
            button.classList.add('nav-dot-btn');
            button.setAttribute('aria-label', `Navigate to segment ${index + 1}: ${section.id || 'unnamed'}`);
            button.setAttribute('title', section.dataset.title || `Step ${index + 1}`);
            
            // Connect click handler
            button.addEventListener('click', () => {
                this.goTo(index);
            });

            li.appendChild(button);
            this.dotsContainer.appendChild(li);
        });
    }

    /**
     * Attaches system-wide event listeners for unified desktop/mobile interactivity
     */
    registerEventListeners() {
        // Wheel Event listener with elegant inertia throttle
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Keyboard navigation for accessibility
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Touch event tracking for seamless swipes on smartphones/tablets
        window.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Custom hardware back/forward browser support (on hash change)
        window.addEventListener('hashchange', () => this.handleHashChange());

        // Header/Footer controls
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
    }

    /**
     * Intercepts and throttles standard mouse scroll wheels to map to page sections
     * @param {WheelEvent} event 
     */
    handleWheel(event) {
        // Prevent default browser scrolling
        event.preventDefault();

        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastScrollTime;

        // Block wheel scrolls during ongoing active transition or inside debounce window
        if (this.isTransitioning || timeDiff < this.config.scrollThrottleDuration) {
            return;
        }

        // Determine scroll magnitude and trigger navigate
        const delta = Math.sign(event.deltaY);
        
        if (delta > 0) {
            this.next('down');
        } else if (delta < 0) {
            this.prev('up');
        }
    }

    /**
     * Handles keyboard events (ArrowUp, ArrowDown, PageUp, PageDown)
     * @param {KeyboardEvent} event 
     */
    handleKeyDown(event) {
        if (this.isTransitioning) return;

        switch (event.key) {
            case 'ArrowDown':
            case 'PageDown':
                this.next('down');
                break;
            case 'ArrowUp':
            case 'PageUp':
                this.prev('up');
                break;
            default:
                break;
        }
    }

    /**
     * Analyzes finger swipes to navigate on mobile devices
     * @param {TouchEvent} event 
     */
    handleTouchEnd(event) {
        if (this.isTransitioning) return;

        const touchEndY = event.changedTouches[0].clientY;
        const touchEndX = event.changedTouches[0].clientX;
        
        const deltaY = touchEndY - this.touchStartY;
        const deltaX = touchEndX - this.touchStartX;

        // Register action only if swipe distance is significant (threshold 50px)
        if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
            if (deltaY < 0) {
                // Swiped up -> show next section down
                this.next('down');
            } else {
                // Swiped down -> show previous section up
                this.prev('up');
            }
        }
    }

    /**
     * Handles browser back/forward buttons using document hash change
     */
    handleHashChange() {
        const hash = window.location.hash;
        if (!hash) {
            this.goTo(0);
            return;
        }
        
        const sectionId = hash.replace('#', '');
        const matchedIndex = this.sections.findIndex(sec => sec.id === sectionId);
        
        if (matchedIndex !== -1 && matchedIndex !== this.currentIndex) {
            this.goTo(matchedIndex);
        }
    }

    /**
     * Core slide navigation logic
     * @param {number} targetIndex - Index of segment to show.
     * @param {string|null} direction - Transition direction ('up' | 'down') for visual rendering overrides.
     */
    goTo(targetIndex, direction = null) {
        if (this.isTransitioning || targetIndex === this.currentIndex) return;
        if (targetIndex < 0 || targetIndex >= this.sections.length) return;

        // Fallback direction calculator if not provided explicitly
        if (!direction) {
            direction = targetIndex > this.currentIndex ? 'down' : 'up';
        }

        this.isTransitioning = true;
        this.lastScrollTime = Date.now();
        
        const previousIndex = this.currentIndex;
        this.currentIndex = targetIndex;

        // Apply visual updates to slides and nav items
        this.updateSectionStates(direction, previousIndex);
        this.updateUIPeripherals();
        this.saveState();

        // Broadcast index shift to registered plugin receivers/callbacks (useful for bespoke animations)
        this.changeCallbacks.forEach(cb => cb(this.currentIndex, previousIndex, direction));

        // Wait out the CSS variable transition time before enabling further steps
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.config.scrollThrottleDuration);
    }

    /**
     * Steps to the next available section
     * @param {string} direction - Transition motion indicator
     */
    next(direction = 'down') {
        if (this.currentIndex < this.sections.length - 1) {
            this.goTo(this.currentIndex + 1, direction);
        }
    }

    /**
     * Steps to the previous section
     * @param {string} direction - Transition motion indicator
     */
    prev(direction = 'up') {
        if (this.currentIndex > 0) {
            this.goTo(this.currentIndex - 1, direction);
        }
    }

    /**
     * Synchronizes DOM nodes to run clean transition animations
     * @param {string|null} direction 
     * @param {number|null} previousIndex 
     */
    updateSectionStates(direction, previousIndex = null) {
        this.sections.forEach((section, index) => {
            // Remove all transition modifiers first
            section.classList.remove(this.config.activeClass, 'exit-up', 'exit-down');

            if (index === this.currentIndex) {
                section.classList.add(this.config.activeClass);
            } else if (previousIndex !== null) {
                // Apply elegant exit trajectories
                if (index === previousIndex) {
                    if (direction === 'down') {
                        section.classList.add('exit-up');
                    } else {
                        section.classList.add('exit-down');
                    }
                }
            }
        });
    }

    /**
     * Handles peripheral visual updates (nav dots active classes, disabled button toggles)
     */
    updateUIPeripherals() {
        // 1. Synchronize DOT indicators
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.nav-dot-item');
            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // 2. Synchronize Arrow button states (enable/disable based on boundary)
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.sections.length - 1;
        }
    }

    /**
     * Commits position indices to disk (Local Storage + URL Address Hash)
     */
    saveState() {
        // Save to Local Storage
        if (this.config.useLocalStorage) {
            localStorage.setItem(this.config.storageKey, this.currentIndex);
        }

        // Save to Hash for bookmarking (Update only if section features an ID tag)
        const activeSection = this.sections[this.currentIndex];
        if (activeSection && activeSection.id) {
            // Temporarily unbind hashchange listener to prevent infinite triggers
            // (Using pushState keeps a cleaner browser history stack)
            history.pushState(null, null, `#${activeSection.id}`);
        }
    }

    /**
     * Exposes registration functions for external developers to hook custom animations
     * @param {Function} callback - Function of signature (currentIndex, previousIndex, direction) => void
     */
    addChangeListener(callback) {
        if (typeof callback === 'function') {
            this.changeCallbacks.push(callback);
        }
    }

    /**
     * Updates the section cache if content is loaded asynchronously
     */
    refresh() {
        this.sections = Array.from(document.querySelectorAll(this.config.sectionSelector));
        this.buildDotNavigation();
        this.updateSectionStates(null);
        this.updateUIPeripherals();
    }
}

// Bind to window to make module accessible globally across scripts
window.SurpriseNavigation = NavigationController;
