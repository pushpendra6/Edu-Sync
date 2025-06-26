import { BrowserRouter as Router , Routes, Route,} from 'react-router-dom'
import './App.css';
import LandingPage from './Components/LandingPage';
import StudentDashboard from './Dashboards/Student/StudentDashboard';
import InstructorDashboard from './Dashboards/Instructor/InstructorDashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import CourseUpload from './Dashboards/Instructor/CourseUpload';
import QuizMenu from './Dashboards/Student/QuizMenu';
import QuizWindow from './Dashboards/Student/QuizWindow';


const App = () => {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                {/* Private routes */}
                <Route path='/student-dashboard' element={ <StudentDashboard/>  }/>
                <Route path='/instructor-dashboard' element={ <InstructorDashboard/>  }/>
                <Route path='/add-courses' element={ <CourseUpload/>  }/>
                <Route path='/student-dashboard/quiz' element={ <QuizMenu/>  }/>
                <Route path='quiz/:category' element={ <QuizWindow/>  }/>
            </Routes>
        </div>
    </Router>
  )
}

export default App;
