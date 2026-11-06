export abstract class AbstractValidator {
  protected next: AbstractValidator | null = null;

  public setNext(next: AbstractValidator): AbstractValidator {
    this.next = next;
    return next;
  }

  public abstract validate(): boolean;
}
