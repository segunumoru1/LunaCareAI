import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home/Home";

interface IState {
  currentTab: string;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentTab: "home",
    };
  }

  setActiveTab = (tab: string) => {
    this.setState({ currentTab: tab });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <style>
            {`
              body {
                font-family: Arial, sans-serif;
              }
              header {
                background: #f2f2f2;
                padding: 20px 40px;
                text-align: center;
              }
              nav ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
                display: flex;
                justify-content: center;
              }
              nav ul li {
                margin: 0 10px;
              }
              nav ul li a {
                text-decoration: none;
                color: #333;
                font-size: 16px;
                padding: 10px 20px;
                border: 2px solid transparent;
                border-radius: 10px;
                transition: all 0.3s ease;
              }
              nav ul li a:hover,
              nav ul li .active {
                border-color: #666;
                background-color: #ddd;
              }
              main {
                padding: 20px;
                text-align: center;
              }
            `}
          </style>
          <header>
            <h1>Lunar Care</h1>
            <nav>
              <ul>
                <li
                  className={this.state.currentTab === "home" ? "active" : ""}
                >
                  <Link to="/" onClick={() => this.setActiveTab("home")}>
                    Home
                  </Link>
                </li>
                <li
                  className={
                    this.state.currentTab === "resources" ? "active" : ""
                  }
                >
                  <Link
                    to="/resources"
                    onClick={() => this.setActiveTab("resources")}
                  >
                    Resources
                  </Link>
                </li>
                <li
                  className={
                    this.state.currentTab === "support" ? "active" : ""
                  }
                >
                  <Link
                    to="/support"
                    onClick={() => this.setActiveTab("support")}
                  >
                    Support
                  </Link>
                </li>
                <li
                  className={
                    this.state.currentTab === "tracker" ? "active" : ""
                  }
                >
                  <Link
                    to="/tracker"
                    onClick={() => this.setActiveTab("tracker")}
                  >
                    Health Tracker
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/support" element={<Support />} />
              <Route path="/tracker" element={<Tracker />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

function Resources() {
  return (
    <div>
      <h2>Resources</h2>
      <p>Find articles, tips, and guides on postpartum care.</p>
    </div>
  );
}

function Support() {
  return (
    <div>
      <h2>Support Groups</h2>
      <p>Connect with other mothers and share experiences and support.</p>
    </div>
  );
}

function Tracker() {
  return (
    <div>
      <h2>Health Tracker</h2>
      <p>Track your mood, sleep, nutrition, and other health parameters.</p>
    </div>
  );
}

export default App;
