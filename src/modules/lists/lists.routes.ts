import { Router } from 'express';
import { ListsController } from './lists.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createListSchema, updateListSchema, addFilmSchema } from './lists.schema';

const router = Router();
const listsController = new ListsController();

/**
 * @openapi
 * tags:
 *   name: Lists
 *   description: Gestión de listas personalizadas. Permite crear colecciones de películas y series organizadas por el usuario.
 */

/**
 * @openapi
 * /v1/lists:
 *   post:
 *     tags: [Lists]
 *     summary: Crear una nueva lista
 *     description: Crea una lista personalizada para organizar películas y series. Ejemplos - "Mejores del 2024", "Para ver con amigos", "Clásicos imprescindibles".
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mejores del 2024
 *               description:
 *                 type: string
 *                 example: Las mejores películas que vi durante el año 2024.
 *     responses:
 *       201:
 *         description: Lista creada exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   get:
 *     tags: [Lists]
 *     summary: Obtener todas las listas del usuario
 *     description: Retorna todas las listas creadas por el usuario autenticado, incluyendo las películas de cada lista.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listas obtenidas exitosamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.post('/',                    authMiddleware, validate(createListSchema), listsController.create);
/**
 * @openapi
 * /v1/lists/{id}:
 *   get:
 *     tags: [Lists]
 *     summary: Obtener una lista por ID
 *     description: Retorna la información detallada de una lista específica incluyendo todas sus películas.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la lista en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Lista encontrada exitosamente.
 *       404:
 *         description: La lista no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   put:
 *     tags: [Lists]
 *     summary: Actualizar una lista
 *     description: Actualiza el nombre o descripción de una lista existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la lista en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mis favoritas de todos los tiempos
 *               description:
 *                 type: string
 *                 example: Descripción actualizada de la lista.
 *     responses:
 *       200:
 *         description: Lista actualizada exitosamente.
 *       404:
 *         description: La lista no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   delete:
 *     tags: [Lists]
 *     summary: Eliminar una lista
 *     description: Desactiva una lista del usuario (soft delete). Las películas dentro de la lista no se eliminan.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la lista en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Lista eliminada exitosamente.
 *       404:
 *         description: La lista no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.get('/',                     authMiddleware, listsController.findAll);
router.get('/:id',                  authMiddleware, listsController.findById);
router.put('/:id',                  authMiddleware, validate(updateListSchema), listsController.update);
/**
 * @openapi
 * /v1/lists/{id}/films:
 *   post:
 *     tags: [Lists]
 *     summary: Agregar una película a la lista
 *     description: Agrega una película o serie existente a una lista personalizada del usuario.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la lista en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [filmId]
 *             properties:
 *               filmId:
 *                 type: string
 *                 description: ID de la película a agregar
 *                 example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Película agregada a la lista exitosamente.
 *       404:
 *         description: La lista no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   delete:
 *     tags: [Lists]
 *     summary: Eliminar una película de la lista
 *     description: Elimina una película o serie de una lista personalizada del usuario.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la lista en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [filmId]
 *             properties:
 *               filmId:
 *                 type: string
 *                 description: ID de la película a eliminar de la lista
 *                 example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Película eliminada de la lista exitosamente.
 *       404:
 *         description: La lista no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.post('/:id/films',           authMiddleware, validate(addFilmSchema), listsController.addFilm);
router.delete('/:id/films',         authMiddleware, validate(addFilmSchema), listsController.removeFilm);
router.delete('/:id',               authMiddleware, listsController.delete);

export default router;