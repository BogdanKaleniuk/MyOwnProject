import { body } from "express-validator";

export const loginValidation = [
  body("email", "Не вірний формат пошти").isEmail(),
  body("password", "Пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Не вірний формат пошти").isEmail(),
  body("password", "Пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
  body("fullName", "Вкажіть ім'я").isLength({ min: 3 }),
  body("avatarUrl", "Не вірна ссилка на аватарку").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введіть заголовок статті").isLength({ min: 3 }).isString(),
  body("text", "Введіть текст статті").isLength({ min: 3 }).isString(),
  body("tags", "Не вірний формат тегів (вкажіть масив) ").optional().isString(),
  body("imageUrl", "Не вірна ссилка на зображення").optional().isString(),
];
