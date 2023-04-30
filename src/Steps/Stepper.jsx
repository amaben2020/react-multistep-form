import { useLocation } from "react-router-dom";

export const Stepper = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return (
      "nav-link disabled " + (path === location.pathname ? "active" : undefined)
    );
  };

  const links = [
    { url: "/", title: "Contact" },
    { url: "/education", title: "Education" },
    { title: "About", url: "/about" },
    { title: "Confirm", url: "/confirm" },
  ];

  return (
    <nav className="stepper navbar navbar-expand-lg">
      <div className="collapse navbar-collapse">
        <ol className="navbar-nav">
          {links.map((l) => (
            <li className="step nav-item">
              <span className={getLinkClass(l.url)}>{l.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
