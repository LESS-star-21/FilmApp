import { Router } from 'express';
import { GenresController } from './genres.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createGenreSchema, updateGenreSchema } from './genres.schema';

const router = Router();
const genresController = new GenresController();

/**
 * @openapi
 * tags:
 *   name: Genres
 *   description: Gestión de géneros cinematográficos. Permite administrar el catálogo de géneros disponibles para clasificar películas y series.
 */

/**
 * @openapi
 * /v1/genres:
 *   post:
 *     tags: [Genres]
 *     summary: Crear un nuevo género
 *     description: Agrega un nuevo género al catálogo para clasificar películas y series.
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
 *                 example: Acción
 *               description:
 *                 type: string
 *                 example: Películas con mucha acción, peleas y persecuciones.
 *     responses:
 *       201:
 *         description: Género creado exitosamente.
 *       400:
 *         description: Datos inválidos o el género ya existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   get:
 *     tags: [Genres]
 *     summary: Obtener todos los géneros
 *     description: Retorna la lista completa de géneros activos disponibles en el catálogo.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de géneros obtenida exitosamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.post('/',    authMiddleware, validate(createGenreSchema), genresController.create);

/**
 * @openapi
 * /v1/genres/{id}:
 *   get:
 *     tags: [Genres]
 *     summary: Obtener un género por ID
 *     description: Retorna la información detallada de un género específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del género en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Género encontrado exitosamente.
 *       404:
 *         description: El género no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   put:
 *     tags: [Genres]
 *     summary: Actualizar un género
 *     description: Actualiza la información de un género existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del género en MongoDB
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
 *                 example: Comedia
 *               description:
 *                 type: string
 *                 example: Películas divertidas que generan humor.
 *     responses:
 *       200:
 *         description: Género actualizado exitosamente.
 *       404:
 *         description: El género no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   delete:
 *     tags: [Genres]
 *     summary: Eliminar un género
 *     description: Desactiva un género del catálogo (soft delete).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del género en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Género eliminado exitosamente.
 *       404:
 *         description: El género no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.get('/',     authMiddleware, genresController.findAll);
router.get('/:id',  authMiddleware, genresController.findById);
router.put('/:id',  authMiddleware, validate(updateGenreSchema), genresController.update);
router.delete('/:id', authMiddleware, genresController.delete);

export default router;