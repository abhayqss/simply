import UrlPattern from 'url-pattern'

export function pattern (t) {
    return new UrlPattern(t)
}

export function matches (t, p) {
    return pattern(t).match(p)
}