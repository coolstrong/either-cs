/**
 * Either (or discriminated union) - is a type that either holds a value of type L or a value of type R,
 * but never both at the same time.
 */
export default class Either<L,R> {
    private constructor(public left: L | null, public right: R | null) {}

    /** 
     * Returns an either of left part.
     */
    static left<L, R = null>(left: L) {
        if (left === null) {
            throw new Error('Left value cannot be null');
        }

        return new Either(left, null as R | null);
    }

    /**
     * Returns an either of right part.
     */
    static right<R, L = null>(right: R) {
        if (right === null) {
            throw new Error('Right value cannot be null');
        }

        return new Either(null as L | null, right);
    }

    /**
     * Returns an either with right value (alias for {@link Either.right}).
     */
    static of = Either.right;

    /**
     * Returns an either made of throwing function - left represents error, right - computed value.
     */
    static try<R, L = any>(f: () => R): Either<L, R> {
        try {
            return Either.right(f());
        } catch (e) {
            return Either.left(e as L);
        }
    }
    
    /**
     * Make an either of promise or async function - right represents resolved value, left - rejected value.
     */
    static promise<R, L = any>(p: Promise<R> | (() => Promise<R>)) : Promise<Either<L, R>> {
        return (typeof p === "function" ? p() : p).then(this.right<R, L>, this.left<L, R>);
    }

    /**
     * Folds an either to a value.
     */
    fold<T>(rightFn: (right: R) => T, leftFn: (left: L) => T) : T {
        return (this.right !== null ? rightFn(this.right) : leftFn(this.left!));
    }

    /**
     * Folds an Either to right type value - 
     * if either is right, returns the right part, else maps left value to the right type.
     */
    foldLeft(leftFn: (left: L) => R) : R {
        return (this.right !== null ? this.right : leftFn(this.left!));
    }

    /**
     * Folds an Either to left type value -
     * if either is left, returns the left part, else maps right value to the left type.
     */
    foldRight(rightFn: (right: R) => L) : L {
        return (this.left !== null ? this.left : rightFn(this.right!));
    }

    /**
     * Returns a new Either with left and right values swapped.
     */
    swap() : Either<R, L> {
        return new Either(this.right, this.left);
    }

    /**
     * Maps left value to a new one.
     */
    leftMap<L2>(fn: (left: L) => L2) : Either<L2, R> {
        return this.right !== null ? Either.right(this.right) : Either.left(fn(this.left!));
    }

    /**
     * Maps right value to a new one.
     */
    rightMap<R2>(fn: (right: R) => R2) : Either<L, R2> {
        return this.left !== null ? Either.left(this.left) : Either.right(fn(this.right!));
    }

    /**
     * Maps both values to new ones.
     */
    bimap<L2, R2>(leftFn: (left: L) => L2, rightFn: (right: R) => R2) : Either<L2, R2> {
        return this.right !== null ? Either.right(rightFn(this.right!)) : Either.left(leftFn(this.left!));
    }

    /**
     * Applies a side effect to the left value (if presents).
     */
    traceLeft(fn: (left: L) => void) : Either<L, R> {
        if (this.left !== null)
            fn(this.left);
        
        return this;
    }

    /**
     * Applies a side effect to the right value (if presents).
     */
    traceRight(fn: (right: R) => void) : Either<L, R> {
        if (this.right !== null)
            fn(this.right);

        return this;
    }

    /**
     * Applies side effects to both values.
     */
    trace(leftFn: (left: L) => void, rightFn: (right: R) => void) : Either<L, R> {
        return this.traceLeft(leftFn).traceRight(rightFn);
    }


    toString() : string {
        return this.fold(
            (right) => `Right(${right})`,
            (left) => `Left(${left})`
        );
    }
}