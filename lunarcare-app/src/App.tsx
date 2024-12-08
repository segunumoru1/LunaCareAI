import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Messages from "./Components/Api/DjangoMessages";
import "./App.css";
import { ReactComponent as HomeIcon } from "./Assets/Icons/home.svg";
import { ReactComponent as SupportIcon } from "./Assets/Icons/messages-2.svg";
import CircularNavButton from "./Components/Common/CircularNavButton/CircularNavButton";
import { ReactComponent as HealthTrackerIcon } from "./Assets/Icons/health.svg";
import Voice from "./Components/Voice/Voice";
import ToggleSwitch from "./Components/Common/ToggleSwitch/ToggleSwitch";

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

  render() {
    const setActiveTab = (tab: string) => {
      this.setState({ currentTab: tab });
    };
    return (
      <Router>
        <div className="App">
          <header>
            <h1>LunaCare AI</h1>
            <nav>
              <ul>
                <li
                  className={this.state.currentTab === "home" ? "active" : ""}
                >
                  <CircularNavButton
                    icon={HomeIcon}
                    text="Luna"
                    showText={true}
                    selected={this.state.currentTab === "home"}
                    to="/"
                    onClick={() => setActiveTab("home")}
                  />
                </li>
                <li
                  className={
                    this.state.currentTab === "support" ? "active" : ""
                  }
                >
                  <CircularNavButton
                    icon={SupportIcon}
                    text="Communities"
                    showText={true}
                    selected={this.state.currentTab === "support"}
                    to="/support"
                    onClick={() => setActiveTab("support")}
                  />
                </li>
                <li
                  className={
                    this.state.currentTab === "tracker" ? "active" : ""
                  }
                >
                  <CircularNavButton
                    icon={HealthTrackerIcon}
                    text="Daily Checkin"
                    showText={true}
                    selected={this.state.currentTab === "tracker"}
                    to="/tracker"
                    onClick={() => setActiveTab("tracker")}
                  />
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
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

function Resources() {
  return (
    <div className="main-content">
      <h2>Resources</h2>
      <p>Find articles, tips, and guides on postpartum care.</p>
    </div>
  );
}

function Support() {
  return (
    <div className="main-content">
      <h2>Support Groups</h2>
      <p>Connect with other mothers and share experiences and support.</p>
    </div>
  );
}

function Tracker() {
  return (
    <div className="main-content">
      <h2>Health Tracker</h2>
      <p>Track your mood, sleep, nutrition, and other health parameters.</p>
    </div>
  );
}

export default App;
