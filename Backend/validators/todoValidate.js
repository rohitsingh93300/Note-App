import yup from 'yup'

export const todoSchema = yup.object({
    title: yup
    .string()
    .trim()
    .min(3,'Title must be atleast 3 character')
    .max(20,'Title must be at most 20 character')
})

export const validateTodo = (schema) => async(req, res, next)=>{
    try {
        await schema.validate(req.body)
        next();
    } catch (err) {
        return res.status(400).json({error:err.errors})
    }
}