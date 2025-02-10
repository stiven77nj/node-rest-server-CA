

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.text) returnObj.Text = this.text;
        if (this.completedAt) returnObj.CompletedAt = this.completedAt;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        if (!id || isNaN(id)) return ['Propiedad id no es valida', undefined];

        if (completedAt) {
            newCompletedAt = new Date(completedAt);

            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['La propiedad completedAt debe ser una fecha válida', undefined];
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }

}