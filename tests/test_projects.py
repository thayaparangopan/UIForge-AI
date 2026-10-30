import io
from PIL import Image

def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "running" in data.get("message", "").lower()

def test_create_and_get_project(client):
    # 1. Create project
    create_payload = {
        "project_name": "Test Mobile App",
        "framework": "react-native",
        "description": "Integration test project"
    }
    create_res = client.post("/api/projects/", json=create_payload)
    assert create_res.status_code == 200
    created_data = create_res.json()
    assert created_data["project_name"] == "Test Mobile App"
    assert created_data["framework"] == "react-native"
    project_id = created_data["id"]

    # 2. Get project by ID
    get_res = client.get(f"/api/projects/{project_id}")
    assert get_res.status_code == 200
    fetched_data = get_res.json()
    assert fetched_data["id"] == project_id
    assert fetched_data["status"] == "created"

def test_upload_valid_screenshot(client):
    # Create project first
    proj_res = client.post("/api/projects/", json={"project_name": "Upload Target", "framework": "react"})
    proj_id = proj_res.json()["id"]

    # Generate a small in-memory PNG
    img = Image.new("RGB", (100, 200), color="blue")
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    files = {"file": ("test_ui.png", img_byte_arr, "image/png")}
    upload_res = client.post(f"/api/projects/{proj_id}/upload", files=files)
    assert upload_res.status_code == 200
    upload_data = upload_res.json()
    assert upload_data["project_id"] == proj_id
    assert upload_data["width"] == 100
    assert upload_data["height"] == 200
    assert upload_data["file_name"] == "test_ui.png"

def test_upload_invalid_mime_type(client):
    proj_res = client.post("/api/projects/", json={"project_name": "Invalid File Test"})
    proj_id = proj_res.json()["id"]

    fake_text_file = io.BytesIO(b"This is not a UI screenshot.")
    files = {"file": ("malicious.txt", fake_text_file, "text/plain")}
    res = client.post(f"/api/projects/{proj_id}/upload", files=files)
    assert res.status_code == 400
    assert "invalid file type" in res.json()["detail"].lower()
