import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="container-x py-16">
      <div className="lux-card p-10">
        <div className="lux-kicker">404</div>
        <div className="mt-2 lux-title text-2xl font-semibold">Page not found</div>
        <p className="mt-3 text-sm text-pearl/70">
          The page you’re looking for doesn’t exist. Go back home or browse ongoing projects.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="lux-btn-primary">
            Back to Home
          </Link>
          <Link to="/ongoing-projects" className="lux-btn-ghost">
            Ongoing Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

