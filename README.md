# Portfolio Project

This is a Django-based portfolio project. It showcases skills, projects, social links, and contact information.

## Project Structure

```
/home/bossd/Just bosd/
├── portfolio_project/
│   ├── portfolio/
│   │   ├── migrations/
│   │   ├── static/
│   │   ├── templates/
│   │   │   └── portfolio/
│   │   │       └── index.html
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── portfolio_project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
├── README.md
```

## Description

- **portfolio_project/**: The main Django project directory.
  - **portfolio/**: The Django app for the portfolio.
    - **migrations/**: Database migrations.
    - **static/**: Static files (CSS, JavaScript, images).
    - **templates/**: HTML templates.
      - **portfolio/**: Templates specific to the portfolio app.
        - **index.html**: The main template for the portfolio homepage.
    - **admin.py**: Admin configuration.
    - **apps.py**: App configuration.
    - **models.py**: Database models.
    - **tests.py**: Tests for the app.
    - **urls.py**: URL routing for the app.
    - **views.py**: Views for handling requests and rendering templates.
  - **portfolio_project/**: The main project configuration.
    - **settings.py**: Project settings.
    - **urls.py**: URL routing for the project.
    - **wsgi.py**: WSGI configuration for deployment.
  - **manage.py**: Command-line utility for administrative tasks.

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/javlonovic/portfolio
    ```

2. **Create a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Apply migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Run the development server**:
    ```bash
    python manage.py runserver
    ```

6. **Access the application**:
    Open your web browser and go to `http://127.0.0.1:8000/`.

## Configuration

- **Email Backend**: Configure your email backend in `settings.py` to enable the contact form functionality.

## License

This project is licensed under the MIT License.
