

export class CreateTodoDto {

    private constructor(
        public readonly text: string,
    ) { }

    static create(props: { [key: string]: string }): [string?, CreateTodoDto?] {
        const { text } = props;

        if (!text) return ['Propiedad text es requerida', undefined]

        if (typeof text !== 'string') return ['Propiedad text debe ser de tipo String', undefined]

        // -- TODO: Implementar una expresion regular para que no se reciban cadenas con espacios vacios 

        return [undefined, new CreateTodoDto(text)];
    }

}