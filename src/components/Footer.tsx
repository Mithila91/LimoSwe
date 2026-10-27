import { Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="section-divider bg-limo-surface px-6 py-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 leading-none">
              <div className="font-serif text-2xl font-light tracking-[0.12em] text-limo-white">
                LIMO
              </div>
              <div className="font-sans text-[0.55rem] tracking-[0.3em] text-limo-gold uppercase">
                Sweden
              </div>
            </div>
            <p className="font-sans text-body-small text-limo-muted leading-relaxed max-w-xs">
              Stockholm&apos;s premier private chauffeur service. Available 24/7
              across Sweden and Europe.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-label text-limo-gold tracking-[0.25em] uppercase mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+46101717117"
                className="flex items-center gap-3 text-limo-muted hover:text-limo-gold transition-colors"
              >
                <Phone size={14} strokeWidth={1.5} />
                <span className="font-sans text-body-small">+4610 17 17 117</span>
              </a>
              <a
                href="https://wa.me/46101717117"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-limo-muted hover:text-limo-gold transition-colors"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
                <span className="font-sans text-body-small">WhatsApp</span>
              </a>
              <a
                href="mailto:info@limoswe.se"
                className="flex items-center gap-3 text-limo-muted hover:text-limo-gold transition-colors"
              >
                <Mail size={14} strokeWidth={1.5} />
                <span className="font-sans text-body-small">info@limoswe.se</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-label text-limo-gold tracking-[0.25em] uppercase mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {["About", "Concierge", "Fleet", "Services", "Booking"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-sans text-body-small text-limo-muted hover:text-limo-white transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-limo-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-body-small text-limo-muted">
            &copy; {year} Limo Sweden. All rights reserved.
          </p>
          <a
            href="/privacy"
            className="font-sans text-body-small text-limo-muted hover:text-limo-white transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
