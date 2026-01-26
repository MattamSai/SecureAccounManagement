import * as z from "zod"

export const validatePassword = z.string()
.min(5,"password must be aleast five characters")
.regex(/[A-Z]/,"Must contain aleast one capital letter")
.regex(/[/*&@%$]/,"Must contain alteast one special character")
.regex(/[0-9]/,"Must contain aleast one number")


export const validateUserEmail = z.string()
.regex(/[@]/,'email must contain @')
