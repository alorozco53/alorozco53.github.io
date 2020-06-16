FROM jekyll/jekyll:3

COPY --chown=jekyll:jekyll Gemfile .
COPY --chown=jekyll:jekyll Gemfile.lock .

#RUN bundle config set clean 'true'
RUN bundle install #--quiet
#RUN bundle clean --force

CMD ["jekyll", "serve"]
