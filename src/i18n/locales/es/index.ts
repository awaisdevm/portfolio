import ui from "./ui.json";
import seo from "./seo.json";
import about from "./about.json";
import projects from "./projects.json";
import services from "./services.json";
import testimonials from "./testimonials.json";
import experiences from "./experiences.json";
import blog from "./blog.json";

const es = {
    ...ui,

    seo,
    about,
    projects,
    services,
    testimonials,
    experiences,
    blog,


    projectsData: projects.items,
    testimonialsData: testimonials.items,
    experiencesData: experiences.items,
    aboutData: about,
};

export default es;