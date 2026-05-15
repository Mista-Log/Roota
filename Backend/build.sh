#!/usr/bin/env bash
set -o errexit

pip install uv

uv sync

python manage.py migrate

python manage.py collectstatic --noinput