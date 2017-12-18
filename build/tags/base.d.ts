import { Tag as SaxTag } from "sax";
import State from '../state';
declare abstract class BaseTag {
    data: SaxTag;
    state: State;
    protected className: string;
    protected classNames: Set<string>;
    abstract close(): string;
    abstract open(): string;
    constructor(data: SaxTag, state: State);
    protected classNamesToString(): string;
    protected getAttributes(): string;
    protected openAfter(): string;
    protected closeBefore(): string;
    name(): string;
}
export default BaseTag;
