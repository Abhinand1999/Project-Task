import Todo from '../models/Todo.js'
import Project from '../models/Project.js'


// <-----------------------craete a Todo List------------------------------>
export const createTodo=async (req, res) =>{
  const { description } = req.body;
  const projectId = req.params.id;


    if(!description)
      {
        return res.status(500).json({ message: "add description" })
      } 
    const existProjects = await Project.findOne({ description}).exec();
      if(existProjects)
        {
          return res.status(500).json({ message: "description is already exist" })
        }


  const todo = new Todo({
    description,
    status: 'pending',
    createdDate: new Date()
  });

  try {
    const savedTodo = await todo.save();
    const project = await Project.findById(projectId);
    project.todos.push(savedTodo);
    await project.save();
    res.status(201).json(savedTodo);
    
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
}

// <-----------------------Mark a CheckBox----------------------------->

export const MarkUpadte=async (req, res) =>
{
    const { status } = req.body;
    const todoId = req.params.id;
  
    try {
      const todo = await Todo.findById(todoId);
      todo.status = status;
    
      await todo.save();
      res.json(todo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

// <-----------------------Get All todo------------------------------>

export const GetAllTodo = async (req, res) => {
  const id = req.params.id;
  
  try {
    
    const todos = await Project.findById(id, 'todos').populate({path: 'todos',options: { sort: { createdAt: -1 } } });
    
    res.json(todos);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// <-----------------------Update the Todo------------------------------>

export const DiscriotionUpadte=async (req, res) =>
  {
      const { description } = req.body;
      const todoId = req.params.id;
    
      try {
        if(!description)
          {
            return res.status(500).json({ message: "add description " })
          } 
        const todo = await Todo.findById(todoId);
        todo.description = description;
        
        await todo.save();
        res.json(todo);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  }


// <-----------------------delete the Todo------------------------------>

export const deleteTodo = async (req, res) => {
  
  const id = req.params.id;

  try {
    await Todo.findByIdAndDelete(id); 

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
      data: error,
    });
  }
}