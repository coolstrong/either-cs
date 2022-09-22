"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Either (or discriminated union) - is a type that either holds a value of type L or a value of type R,
 * but never both at the same time.
 */
class Either {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    /**
     * Returns an either of left part.
     */
    static left(left) {
        if (left === null) {
            throw new Error('Left value cannot be null');
        }
        return new Either(left, null);
    }
    /**
     * Returns an either of right part.
     */
    static right(right) {
        if (right === null) {
            throw new Error('Right value cannot be null');
        }
        return new Either(null, right);
    }
    /**
     * Returns an either made of throwing function - left represents error, right - computed value.
     */
    static try(f) {
        try {
            return Either.right(f());
        }
        catch (e) {
            return Either.left(e);
        }
    }
    /**
     * Make an either of promise - right represents resolved value, left - rejected value.
     */
    static promise(p) {
        return p.then((this.right), (this.left));
    }
    /**
     * Folds an either to a value.
     */
    fold(rightFn, leftFn) {
        return (this.right !== null ? rightFn(this.right) : leftFn(this.left));
    }
    /**
     * Folds an Either to right type value -
     * if either is right, returns the right part, else maps left value to the right type.
     */
    foldLeft(leftFn) {
        return (this.right !== null ? this.right : leftFn(this.left));
    }
    /**
     * Folds an Either to left type value -
     * if either is left, returns the left part, else maps right value to the left type.
     */
    foldRight(rightFn) {
        return (this.left !== null ? this.left : rightFn(this.right));
    }
    /**
     * Returns a new Either with left and right values swapped.
     */
    swap() {
        return new Either(this.right, this.left);
    }
    /**
     * Maps left value to a new one.
     */
    leftMap(fn) {
        return this.right !== null ? Either.right(this.right) : Either.left(fn(this.left));
    }
    /**
     * Maps right value to a new one.
     */
    rightMap(fn) {
        return this.left !== null ? Either.left(this.left) : Either.right(fn(this.right));
    }
    /**
     * Maps both values to new ones.
     */
    bimap(leftFn, rightFn) {
        return this.right !== null ? Either.right(rightFn(this.right)) : Either.left(leftFn(this.left));
    }
    toString() {
        return this.fold((right) => `Right(${right})`, (left) => `Left(${left})`);
    }
}
exports.default = Either;
/**
 * Returns an either with right value (alias for {@link Either.right}).
 */
Either.of = Either.right;
