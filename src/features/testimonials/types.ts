

export interface RawTestimonial {
    id: number;
    slug: string;
    clientName: string;
    clientRole: string;
    clientImage: string;
    rating: number;
    verified: boolean;
    appUrl: string;
}

export interface Testimonial extends RawTestimonial {
    message: string;
}