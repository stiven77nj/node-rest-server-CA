


export class TodoEntity {

    constructor(
        public Id: number,
        public Text: string,
        public CompletedAt?: Date | null,
    ) { }

    get isCompleted(): boolean {
        return !!this.CompletedAt;
    }

    // -- TODO: Se puede crear un mapper fuera de la entidad 
    public static fromObject(obj: { [key: string]: any }): TodoEntity {
        const { id, text, completedAt } = obj;

        if (!id) throw 'Id must be provided';
        if (!text) throw 'Text must be provided';

        let newCompletedAt;

        if (completedAt) {
            newCompletedAt = new Date(completedAt);

            if (isNaN(newCompletedAt.getTime())) throw 'CompletedAt is not a valid date';
        }

        return new TodoEntity(id, text, completedAt)
    }
}