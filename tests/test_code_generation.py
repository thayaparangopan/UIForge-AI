import zipfile
import io
from app.services.code_gen_service import _generate_fallback_code, create_zip_bundle
from app.services.analysis_service import _generate_fallback_analysis

def test_code_generation_fallback_react_native():
    ir = _generate_fallback_analysis(390, 844, "login.png")
    result = _generate_fallback_code(ir, framework="react-native")
    assert "files" in result
    files = result["files"]
    assert len(files) >= 2

    file_paths = [f["path"] for f in files]
    assert any("screens/" in p for p in file_paths)
    assert any("styles/theme.ts" in p for p in file_paths)

def test_create_zip_bundle():
    sample_files = [
        {"path": "screens/Main.tsx", "content": "export default function Main() {}"},
        {"path": "styles/theme.ts", "content": "export const theme = {};"},
    ]
    zip_bytes = create_zip_bundle(sample_files)
    assert len(zip_bytes) > 0

    # Test reading back the zip in-memory
    with zipfile.ZipFile(io.BytesIO(zip_bytes), "r") as zf:
        namelist = zf.namelist()
        assert "screens/Main.tsx" in namelist
        assert "styles/theme.ts" in namelist
        assert zf.read("screens/Main.tsx").decode() == "export default function Main() {}"

def test_generate_endpoint_and_download(client):
    ir = _generate_fallback_analysis(390, 844, "screen.png")
    payload = {
        "analysisId": "test_analysis_1",
        "framework": "react-native",
        "intermediateRepresentation": ir
    }
    gen_res = client.post("/api/generate", json=payload)
    assert gen_res.status_code == 200
    gen_data = gen_res.json()
    assert "generationId" in gen_data
    assert len(gen_data["files"]) > 0

    gen_id = gen_data["generationId"]
    dl_res = client.get(f"/api/download/{gen_id}.zip")
    assert dl_res.status_code == 200
    assert dl_res.headers["content-type"] == "application/zip"
    assert len(dl_res.content) > 0
