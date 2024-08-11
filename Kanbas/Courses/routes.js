import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };
    app.get("/api/courses", findAllCourses);


    const findCourseById = async (req, res) => {
        const course = await dao.findCourseById(req.params.id);
        res.json(course);
    }
    app.get("/api/courses/:id", findCourseById);

    const deleteCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.deleteCourse(id);
        res.json(status);
        //console.log("Course deleted, id:", id);
    }
    app.delete("/api/courses/:id", deleteCourse);

    const createCourse = async (req, res) => {
        try {
            // Check if course ID is already in the database
            if (await dao.findCourseById(req.body.id)) {
                return res.status(400).json({ message: "Course ID already taken" });
            }

            // Create a new course
            const course = await dao.createCourse(req.body);
            res.json(course);
            //console.log("Course created, id:", req.body.id);
        } catch (error) {
            // Handle any errors that occur during the course creation
            res.status(500).json({ message: "An error occurred while creating the course", error: error.message });
        }
    };
    app.post("/api/courses", createCourse);

    const updateCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateCourse(id, req.body);
        res.json(status);
    };
    app.put("/api/courses/:id", updateCourse);


}
