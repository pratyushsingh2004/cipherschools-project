import { Link } from 'react-router-dom';
import '../styles/main.scss';

const mockData = [
  { id: 1, title: "Get All Users", difficulty: "Easy", desc: "Select all columns from the users table." },
  { id: 2, title: "Filter by Salary", difficulty: "Medium", desc: "Find employees with salary > 50000." },
  { id: 3, title: "Complex Join", difficulty: "Hard", desc: "Join users with orders to find total spend per person." }
];

export default function AssignmentList() {
  return (
    <div className="dashboard-wrapper">
      <div className="container">
        <header className="header">
          <h1 className="main-title">CipherSQL Studio</h1>
          <p className="subtitle">Master SQL with real-time AI feedback</p>
        </header>
        
        <div className="assignment-grid">
          {mockData.map((item) => (
            <div key={item.id} className={`card card--${item.difficulty.toLowerCase()}`}>
              <div className="card__header">
                <span className={`badge badge--${item.difficulty.toLowerCase()}`}>
                  {item.difficulty}
                </span>
              </div>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__desc">{item.desc}</p>
              <Link to={`/attempt/${item.id}`} className="card__btn">
                Solve Challenge
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}