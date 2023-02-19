#!/usr/bin/env python3

from argparse import ArgumentParser, Namespace
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape
import markdown2

CONTEXT = {
    'name': 'Andrew Kerr',
    'nav': {
        'Home' : 'index.html',
        'About': 'about.html',
        'Links': 'links.html',
        'Contact': 'contact.html',
    },
    'posts' : {
        'Recursive Colouring' : 'recursive-colours.html',
        'SICP Diary - Chapter 1': 'sicp-1.html',
    },
    'contact': {
        'github_url' : 'https://github.com/andkerr',
        'linkedin_url': 'https://www.linkedin.com/in/andrew-kerr-1012a3120/',
    },
}

def get_args() -> Namespace:
    parser = ArgumentParser(
        description='Compile Jinja templates and blog posts')
    parser.add_argument(
        'template_dir',
        type=Path,
        help='a directory containing templates to be compiled')
    parser.add_argument(
        'output_dir',
        type=Path,
        help='a directory to write compiled templates to')

    return parser.parse_args()

def compile_post(env, post: str, output_dir) -> None:
    post_dest = Path(post)
    post_source = Path('posts/' + post_dest.stem + '.md')
    post_html = markdown2.markdown(post_source.read_text(),
        extras=['fenced-code-blocks'])
    CONTEXT['post_content'] = post_html

    with (output_dir / post_dest).open('w') as f:
        template = env.get_template('post.html')
        f.write(template.render(CONTEXT))

def compile_links(env, output_dir) -> None:
    links_source = Path('links.md')
    links_dest = Path('links.html')
    links_html = markdown2.markdown(links_source.read_text())
    CONTEXT['links_content'] = links_html
    with (output_dir / links_dest).open('w') as f:
        template = env.get_template('links.html')
        f.write(template.render(CONTEXT))

def compile_templates(templates_dir: Path, output_dir: Path) -> None:
    def include_if(name) -> bool:
        return name not in ['base.html', 'post.html'] and name.endswith('.html')

    loader = FileSystemLoader(templates_dir)
    env = Environment(
        loader=loader,
        autoescape=select_autoescape(),
        trim_blocks=True,
        lstrip_blocks=False)

    output_dir.mkdir(parents=True, exist_ok=True)
    for template_name in env.list_templates(filter_func=include_if):
        with (output_dir / template_name).open('w') as f:
            template = env.get_template(template_name)
            f.write(template.render(CONTEXT))

    for post in CONTEXT['posts'].values():
        compile_post(env, post, output_dir)

    compile_links(env, output_dir)

def main():
    args = get_args()
    compile_templates(args.template_dir, args.output_dir)

if __name__ == '__main__':
    main()
