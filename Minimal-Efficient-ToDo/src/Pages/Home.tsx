import { CheckCircle, Trophy, TrendingUp, Users, ArrowRight, Zap } from 'lucide-react';

interface HomeProps {
    onGetStarted: () => void;
    onLogin: () => void;
}

export default function Home({ onGetStarted, onLogin }: HomeProps) {
    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="nav-container">
                    <div className="nav-logo">
                        <Zap className="icon-medium" />
                        <span>TaskMaster Pro</span>
                    </div>
                    <div className="nav-actions">
                        <button onClick={onLogin} className="nav-login-btn">
                            Login
                        </button>
                        <button onClick={onGetStarted} className="btn-primary">
                            Get Started Free
                        </button>
                    </div>
                </div>
            </nav>

            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Achieve More with Gamified Task Management
                    </h1>
                    <p className="hero-subtitle">
                        Transform your productivity with TaskMaster Pro. Track tasks, earn points,
                        level up, and unlock achievements while getting things done.
                    </p>
                    <div className="hero-buttons">
                        <button onClick={onGetStarted} className="btn-hero-primary">
                            <span>Start Free Today</span>
                            <ArrowRight className="icon-small" />
                        </button>
                        <button onClick={onLogin} className="btn-hero-secondary">
                            Sign In
                        </button>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="hero-card">
                        <div className="hero-card-content">
                            <CheckCircle className="hero-icon" />
                            <h3>Complete Tasks</h3>
                            <p>Organize and track your daily tasks efficiently</p>
                        </div>
                    </div>
                    <div className="hero-card">
                        <div className="hero-card-content">
                            <Trophy className="hero-icon" />
                            <h3>Earn Achievements</h3>
                            <p>Unlock badges and celebrate your progress</p>
                        </div>
                    </div>
                    <div className="hero-card">
                        <div className="hero-card-content">
                            <TrendingUp className="hero-icon" />
                            <h3>Level Up</h3>
                            <p>Gain points and advance through levels</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2 className="features-title">Why TaskMaster Pro?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon feature-icon-blue">
                            <CheckCircle className="icon-medium" />
                        </div>
                        <h3>Smart Task Management</h3>
                        <p>Create, organize, and prioritize tasks with categories, due dates, and priorities.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-amber">
                            <Trophy className="icon-medium" />
                        </div>
                        <h3>Gamification System</h3>
                        <p>Earn points, unlock achievements, and maintain streaks to stay motivated.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-green">
                            <TrendingUp className="icon-medium" />
                        </div>
                        <h3>Progress Tracking</h3>
                        <p>Visualize your productivity with detailed statistics and progress charts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon feature-icon-purple">
                            <Users className="icon-medium" />
                        </div>
                        <h3>Personal Dashboard</h3>
                        <p>Your own secure space to manage tasks and track your journey.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Boost Your Productivity?</h2>
                <p>Join thousands of users who are achieving more every day.</p>
                <button onClick={onGetStarted} className="btn-cta">
                    Get Started Now - It's Free
                </button>
            </section>

            <footer className="landing-footer">
                <p>&copy; 2025 TaskMaster Pro. All rights reserved.</p>
            </footer>
        </div>
    );
}
