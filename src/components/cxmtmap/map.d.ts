
export interface Map {
    checked?: boolean,
    $refs?: HTMLElement[],
    step: string,
    points: Point[]
}
export interface Point {
    name, tip?, marker?, recommend?, cover?
}