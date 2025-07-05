<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleController extends Controller
{
    /* ------------ READ ------------ */
    public function index()
    {
        return Inertia::render('admin/roles/index', [
            'roles' => Role::withCount('permissions')->paginate(20),
        ]);
    }

    /* ------------ CREATE ------------ */
    public function create()
    {
        return $this->formPage(new Role);
    }

    /* ------------ EDIT ------------ */
    public function edit(Role $role)
    {
        return $this->formPage($role->load('permissions'));
    }

    /* ------------ STORE ------------ */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'          => ['required', 'string', 'unique:roles,name'],
            'permissionIds' => ['array'],
        ]);

        $role = Role::create(['name' => $data['name']]);
        $role->syncPermissions($data['permissionIds'] ?? []);

        // refresh Spatie cache
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        return redirect()->route('admin.roles.index')
            ->with('flash.success', 'Role created');
    }

    /* ------------ UPDATE ------------ */
    public function update(Request $request, Role $role)
    {
        $data = $request->validate([
            'name'          => ['required', 'string', "unique:roles,name,{$role->id}"],
            'permissionIds' => ['array'],
        ]);

        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permissionIds'] ?? []);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        return back()->with('flash.success', 'Role updated');
    }

    /* ------------ Re-usable page helper ------------ */
    private function formPage(Role $role)
    {
        // pull matrix & flatten perms for front-end
        $matrix      = config('permission.modules');
        $permissions = Permission::all()->map(function ($perm) {
            [$module, $ability] = explode('.', $perm->name);
            return [
                'id'      => $perm->id,
                'module'  => $module,
                'ability' => $ability,
            ];
        });

        return Inertia::render('admin/roles/form', [
            'role'            => $role,
            'matrix'          => $matrix,                   // { module: [ability,…] }
            'permissions'     => $permissions,              // flat list with ids
            'selectedIds' => $role->permissions->pluck('id')->values()->all(),
            'isEdit'          => $role->exists,
        ]);
    }
}
