import Home from './components/Home/Home';
import ProjectManager from './components/project-manager/project-manager';
import FormManager from './components/form-manager/form-manager';
import QuestionsManager from './components/questions-manager/questions-manager';
import PhotoLabelManager from "./components/photo-label-manager/photo-label-manager";
export const routes = [
  { path: '/', name: "home", component: Home, exact: true },
  { path: '/project-manager', name: "projectmanager", component: ProjectManager },
  { path: '/form-manager', name: "formmanager", component: FormManager },
  { path: '/questions-manager', name: "questionsmanager", component: QuestionsManager },
  { path: '/photo-label-manager', name: "form-label-manager", component: PhotoLabelManager },
]