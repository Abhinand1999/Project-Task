import Project from '../models/Project.js';
import axios from 'axios';

export const createGits = async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findById(projectId).populate('todos');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const { title, todos } = project;
        const pendingTasks = todos.filter(todo => todo.status === 'pending');
        const completedTasks = todos.filter(todo => todo.status === 'complete');

        // Generate markdown content with controlled spacing
        const markdownContent = `
# ${title}

## **Summary: ${completedTasks.length} / ${todos.length} tasks completed**

## Pending Tasks:
${pendingTasks.map(todo => `- [ ] ${todo.description}`).join('\n') || '- No pending tasks'}

## Completed Tasks:
${completedTasks.map(todo => `- [x] ${todo.description}`).join('\n') || '- No completed tasks'}
        `.trim(); 

        const gistData = {
            description: `Project: ${title}`,
            public: false,
            files: {
                [`${title}.md`]: { content: markdownContent } 
            }
        };

        const response = await axios.post('https://api.github.com/gists', gistData, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });

        res.json({ url: response.data.html_url });
    } catch (err) {
        if (err.response) {
            res.status(err.response.status).json({ message: err.response.data });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};
