import { Request, Response } from "express";
import CreateEventUseCase from "../../Aplication/CreateEventUseCase";

export default class EventController {
    constructor(private CreateEventUseCase: CreateEventUseCase) { }

    async createEvent(req: Request, res: Response) {
        try {
            const { Uv, If, visible } = req.body;

            const event = await this.CreateEventUseCase.run({
                Uv,
                If,
                visible
            });

            return res.status(201).json(event)

        } catch (error) {
            console.error('Error al crear evento:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}