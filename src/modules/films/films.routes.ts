import { Router } from 'express';
import { FilmsController } from './films.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createFilmSchema, updateFilmSchema } from './films.schema';

const router = Router();
const filmsController = new FilmsController();

/**
 * @openapi
 * tags:
 *   name: Films
 *   description: Gestión de películas y series. Permite registrar, consultar, actualizar, eliminar y calificar películas y series del usuario autenticado.
 */

/**
 * @openapi
 * /v1/films:
 *   post:
 *     tags: [Films]
 *     summary: Agregar una película o serie
 *     description: Registra una nueva película o serie en la lista del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, year, genre, type]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               year:
 *                 type: number
 *                 example: 2010
 *               genre:
 *                 type: string
 *                 example: Ciencia ficción
 *               type:
 *                 type: string
 *                 enum: [movie, series]
 *                 example: movie
 *               status:
 *                 type: string
 *                 enum: [pending, watched]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Película creada exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   get:
 *     tags: [Films]
 *     summary: Obtener todas las películas del usuario
 *     description: Retorna la lista de películas y series registradas por el usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas obtenida exitosamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.post('/', authMiddleware, validate(createFilmSchema), filmsController.create);
/**
 * @openapi
 * /v1/films/{id}:
 *   get:
 *     tags: [Films]
 *     summary: Obtener una película por ID
 *     description: Retorna la información detallada de una película o serie específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la película en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Película encontrada exitosamente.
 *       404:
 *         description: La película no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   put:
 *     tags: [Films]
 *     summary: Actualizar una película
 *     description: Actualiza la información de una película o serie. Solo se actualizan los campos enviados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la película en MongoDB
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
 *               title:
 *                 type: string
 *                 example: Inception - Director's Cut
 *               status:
 *                 type: string
 *                 enum: [pending, watched]
 *                 example: watched
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente.
 *       404:
 *         description: La película no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   delete:
 *     tags: [Films]
 *     summary: Eliminar una película
 *     description: Desactiva una película de la lista del usuario (soft delete).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la película en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente.
 *       404:
 *         description: La película no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.get('/', authMiddleware, filmsController.findAll);
router.get('/:id', authMiddleware, filmsController.findById);
router.put('/:id', authMiddleware, validate(updateFilmSchema), filmsController.update);
router.delete('/:id', authMiddleware, filmsController.delete);
/**
 * @openapi
 * /v1/films/{id}/rate:
 *   patch:
 *     tags: [Films]
 *     summary: Calificar una película
 *     description: Registra una calificación de 1 a 5 estrellas y una reseña opcional para una película. Al calificar, el estado de la película cambia automáticamente a "watched".
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la película en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: Una obra maestra del cine moderno.
 *     responses:
 *       200:
 *         description: Calificación registrada exitosamente.
 *       404:
 *         description: La película no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.patch('/:id/rate', authMiddleware, filmsController.rate);

export default router;