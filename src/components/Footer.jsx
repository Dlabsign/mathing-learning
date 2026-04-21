import React from 'react';

const Footer = () => {
    return (
        <>
            <style>{`
                .footer-wrapper {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 16px 24px;
                    z-index: 1000;
                    box-sizing: border-box;
                }

                .footer-glass {
                    background: rgba(83, 99, 221, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    padding: 20px 24px;
                    max-width: 900px;
                    margin: 0 auto;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                /* LEFT */
                .footer-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .footer-logo {
                    width: 40px;
                    height: 40px;
                    object-fit: contain;
                }

                .footer-title {
                    font-family: 'Nunito', sans-serif;
                    font-weight: 800;
                    font-size: 16px;
                    color: #3D2C8D;
                }

                /* RIGHT */
                .footer-right {
                    display: flex;
                    gap: 20px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                }

                .footer-link {
                    color: #7A6B8A;
                    text-decoration: none;
                    transition: 0.3s;
                }

                .footer-link:hover {
                    color: #3D2C8D;
                }

                /* MOBILE */
                @media (max-width: 600px) {
                    .footer-glass {
                        flex-direction: column;
                        text-align: center;
                    }

                    .footer-right {
                        justify-content: center;
                    }
                }
            `}</style>

            <footer className="footer-wrapper">
                <div className="footer-glass">

                    {/* LEFT - LOGO */}
                    <div className="footer-left">
                        <img
                            src="/favicon.svg"
                            alt="logo"
                            className="footer-logo"
                        />
                        <span className="footer-title">MathingLearning</span>
                    </div>

                    {/* RIGHT - MENU */}
                    <div className="footer-right">
                        <a href="/privacy" className="footer-link">
                            Privacy Policy
                        </a>
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Contact
                        </a>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default Footer;