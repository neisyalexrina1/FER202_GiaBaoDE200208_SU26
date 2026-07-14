import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <div className="mb-2 d-flex justify-content-center align-items-center">
          <img src={about.logo} alt="logo" width="24" height="24" className="me-2" />
          <span className="fw-bold">{about.appName}</span>
        </div>
        <div className="small">
          <span>{about.copyright}</span> | <span>{about.version}</span> | <span>{about.course}</span>
        </div>
      </div>
    </footer>
  )
}
