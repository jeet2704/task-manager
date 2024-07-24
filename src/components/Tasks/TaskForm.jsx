import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({
  addTask,
  editTask,
  initialValues = {},
  isEditing,
  setIsEditing,
}) => {
  const formik = useFormik({
    initialValues: {
      title: initialValues.title || "",
      description: initialValues.description || "",
      dueDate: initialValues.dueDate || "",
      priority: initialValues.priority || "Low",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      dueDate: Yup.date()
        .min(new Date(), "Due date must be in the future")
        .required("Due date is required"),
      priority: Yup.string()
        .oneOf(["Low", "Medium", "High"])
        .required("Priority is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const task = {
        id: initialValues.id || uuidv4(),
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        priority: values.priority,
        completed: initialValues.completed || false,
      };
      if (isEditing) {
        editTask(initialValues.id, task);
        setIsEditing(false);
      } else {
        addTask(task);
      }
      resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.title && formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          name="description"
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          id="dueDate"
          name="dueDate"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.dueDate && formik.errors.dueDate}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.dueDate}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          id="priority"
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.priority && formik.errors.priority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.priority}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-5">
        {isEditing ? "Update Task" : "Add Task"}
      </Button>
      {isEditing && (
        <Button
          variant="secondary"
          className="mt-5 ms-3"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
      )}
    </Form>
  );
};

export default TaskForm;

// import React from "react";
// import { Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { v4 as uuidv4 } from "uuid";

// const TaskForm = ({ addTask }) => {
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required("Title is required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       const newTask = {
//         id: uuidv4(),
//         title: values.title,
//         description: values.description,
//         completed: false,
//       };
//       addTask(newTask);
//       resetForm();
//     },
//   });

//   return (
//     <Form onSubmit={formik.handleSubmit}>
//       <Form.Group>
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           id="title"
//           name="title"
//           placeholder="Enter task title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           isInvalid={formik.touched.title && formik.errors.title}
//         />
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.title}
//         </Form.Control.Feedback>
//       </Form.Group>

//       <Form.Group>
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           id="description"
//           name="description"
//           rows={3}
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" className="mt-5">
//         Add Task
//       </Button>
//     </Form>
//   );
// };

// export default TaskForm;
