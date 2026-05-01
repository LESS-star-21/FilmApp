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
 *   description: Gestión de películas y series
 */

/**
 * @openapi
 * /v1/films:
 *   post:
 *     tags: [Films]
 *     summary: Crear una película o serie
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, year, genre, type, status]
 *             properties:
 *               title:
 *                 type: string
 *                 example: michael
 *               year:
 *                 type: number
 *                 example: 2026
 *               genre:
 *                 type: string
 *                 example: action
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
 *         description: Película creada exitosamente
 *       401:
 *         description: No autorizado
 *   get:
 *     tags: [Films]
 *     summary: Obtener todas las películas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, validate(createFilmSchema), filmsController.create);

/**
 * @openapi
 * /v1/films/{id}:
 *   get:
 *     tags: [Films]
 *     summary: Obtener una película por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: No encontrada
 *       401:
 *         description: No autorizado
 *   put:
 *     tags: [Films]
 *     summary: Actualizar una película
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *                 example: "Spiderman - Director's Cut"
 *               status:
 *                 type: string
 *                 enum: [pending, watched]
 *                 example: watched
 *     responses:
 *       200:
 *         description: Película actualizada
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Films]
 *     summary: Eliminar una película
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Película eliminada
 *       401:
 *         description: No autorizado
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               rating:
 *                 type: number
 *                 nullable: true
 *                 example: null
 *               review:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *     responses:
 *       200:
 *         description: Calificación registrada
 *       401:
 *         description: No autorizado
 */
router.patch('/:id/rate', authMiddleware, filmsController.rate);

export default router;