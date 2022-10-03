/**
 * Either (or discriminated union) - is a type that either holds a value of type L or a value of type R,
 * but never both at the same time.
 */
export default class Either<L, R> {
    left: L | null;
    right: R | null;
    private constructor();
    /**
     * Returns an either of left part.
     */
    static left<L, R = null>(left: L): Either<(L & undefined) | (L & {}), R>;
    /**
     * Returns an either of right part.
     */
    static right<R, L = null>(right: R): Either<L, (R & undefined) | (R & {})>;
    /**
     * Returns an either with right value (alias for {@link Either.right}).
     */
    static of: typeof Either.right;
    /**
     * Returns an either made of throwing function - left represents error, right - computed value.
     */
    static try<R, L = any>(f: () => R): Either<L, R>;
    /**
     * Make an either of promise or async function - right represents resolved value, left - rejected value.
     */
    static promise<R, L = any>(p: Promise<R> | (() => Promise<R>)): Promise<Either<L, R>>;
    /**
     * Folds an either to a value.
     */
    fold<T>(rightFn: (right: R) => T, leftFn: (left: L) => T): T;
    /**
     * Folds an Either to right type value -
     * if either is right, returns the right part, else maps left value to the right type.
     */
    foldLeft(leftFn: (left: L) => R): R;
    /**
     * Folds an Either to left type value -
     * if either is left, returns the left part, else maps right value to the left type.
     */
    foldRight(rightFn: (right: R) => L): L;
    /**
     * Returns a new Either with left and right values swapped.
     */
    swap(): Either<R, L>;
    /**
     * Maps left value to a new one.
     */
    leftMap<L2>(fn: (left: L) => L2): Either<L2, R>;
    /**
     * Maps right value to a new one.
     */
    rightMap<R2>(fn: (right: R) => R2): Either<L, R2>;
    /**
     * Maps both values to new ones.
     */
    bimap<L2, R2>(leftFn: (left: L) => L2, rightFn: (right: R) => R2): Either<L2, R2>;
    /**
     * Applies a side effect to the left value (if presents).
     */
    traceLeft(fn: (left: L) => void): Either<L, R>;
    /**
     * Applies a side effect to the right value (if presents).
     */
    traceRight(fn: (right: R) => void): Either<L, R>;
    /**
     * Applies side effects to both values.
     */
    trace(leftFn: (left: L) => void, rightFn: (right: R) => void): Either<L, R>;
    toString(): string;
}
