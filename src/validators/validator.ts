export abstract class AbstractValidator {
  protected next: AbstractValidator | null = null;

  public setNext(next: AbstractValidator): void {
    this.next = next;
  }

  public abstract validate(): boolean;
}
