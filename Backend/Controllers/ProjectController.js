import Project from '../models/Project.js'

// <-----------------------craete a projetc------------------------------>
export const createProject = async (req, res) => {
  try {

    const { title } = req.body;

    if (!title) {
      return res.status(500).json({ message: "add Project title" })
    }
    const existProjects = await Project.findOne({ title }).exec();
    if (existProjects) {
      return res.status(500).json({ message: "Project is already exist" })
    }
    const project = new Project({ user: req.userId, title });
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
}


// <-----------------------Get All  projetcs------------------------------>

export const GetAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId })
    res.json(projects);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
}



// <-----------------------Get Single Priejct------------------------------>
export const GetProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ success: false, message: 'projectId not found' })
    }

    res.json(project);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
}



// <-----------------------Edit the Projetc Title------------------------------>


export const titleUpadte = async (req, res) => {
  const { title } = req.body;
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);
    project.title = title;
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}