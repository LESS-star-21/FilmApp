import { Router } from 'express';
import { ActorsController } from './actors.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createActorSchema, updateActorSchema } from './actors.schema';

const router = Router();
const actorsController = new ActorsController();

/**
 * @openapi
 * tags:
 *   name: Actors
 *   description: Gestión de actores. Permite crear, consultar, actualizar y eliminar actores del catálogo.
 */

/**
 * @openapi
 * /v1/actors:
 *   post:
 *     tags: [Actors]
 *     summary: Crear un nuevo actor
 *     description: Registra un nuevo actor en el catálogo con su información personal y biográfica.
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
 *                 example: Leonardo DiCaprio
 *               nationality:
 *                 type: string
 *                 example: Estadounidense
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *                 example: "1974-11-11T00:00:00.000Z"
 *               biography:
 *                 type: string
 *                 example: Actor ganador del Oscar por The Revenant. Conocido por Titanic e Inception.
 *     responses:
 *       201:
 *         description: Actor creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   get:
 *     tags: [Actors]
 *     summary: Obtener todos los actores
 *     description: Retorna la lista completa de actores activos en el catálogo.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de actores obtenida exitosamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.post('/',      authMiddleware, validate(createActorSchema), actorsController.create);

/**
 * @openapi
 * /v1/actors/{id}:
 *   get:
 *     tags: [Actors]
 *     summary: Obtener un actor por ID
 *     description: Retorna la información detallada de un actor específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del actor en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Actor encontrado exitosamente.
 *       404:
 *         description: El actor no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   put:
 *     tags: [Actors]
 *     summary: Actualizar un actor
 *     description: Actualiza la información de un actor existente. Solo se actualizan los campos enviados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del actor en MongoDB
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
 *                 example: Leonardo DiCaprio
 *               nationality:
 *                 type: string
 *                 example: Estadounidense
 *               biography:
 *                 type: string
 *                 example: Biografía actualizada
 *     responses:
 *       200:
 *         description: Actor actualizado exitosamente.
 *       404:
 *         description: El actor no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   delete:
 *     tags: [Actors]
 *     summary: Eliminar un actor
 *     description: Desactiva un actor del catálogo (soft delete). El registro se mantiene en la base de datos con isActive en false.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del actor en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Actor eliminado exitosamente.
 *       404:
 *         description: El actor no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.get('/',       authMiddleware, actorsController.findAll);
router.get('/:id',    authMiddleware, actorsController.findById);
router.put('/:id',    authMiddleware, validate(updateActorSchema), actorsController.update);
router.delete('/:id', authMiddleware, actorsController.delete);

export default router;